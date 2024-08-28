import { ethers } from "ethers";
import { MintSingleNFTParams, EvolveNFTParams, MintResult, EvolveResult, AssetMetadata, LaosConfig, EventName, BatchMintNFTParams, BatchMintResult } from "../../types";
import { IPFSService } from "../ipfs/IPFSService";
import * as EvolutionCollection from "../../abi/EvolutionCollection";
import EvolutionCollectionAbi from '../../abi/contracts/EvolutionCollection.json';
import BatchMinterAbi from '../../abi/contracts/BatchMinter.json';

const eventNameToEventTypeMap = {
  MintedWithExternalURI: EvolutionCollection.events.MintedWithExternalURI,
  EvolvedWithExternalURI: EvolutionCollection.events.EvolvedWithExternalURI,
};

export class LaosService {
  private provider: ethers.JsonRpcProvider;
  private ipfsService: IPFSService;

  constructor(config: LaosConfig, ipfsService: IPFSService) {
    const { rpcMinter } = config;
    this.provider = new ethers.JsonRpcProvider(rpcMinter);
    this.ipfsService = ipfsService;
  }

  private async mintNFTWithRetries(
    contract: any,
    params: { to: string },
    ipfsCid: string,
    wallet: ethers.Wallet,
    initialGasLimit: number,
    maxRetries: number
  ): Promise<any> {
    let nonce = await wallet.getNonce();
    let gasLimit = initialGasLimit;
    const random = this.randomUint96();
    const tokenUri = `ipfs://${ipfsCid}`;
  
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log("Minting NFT to:", params.to, "nonce:", nonce);
        const tx = await contract.mintWithExternalURI(params.to, random, tokenUri, {
          nonce: nonce,
          gasLimit: gasLimit
        });
  
        console.log(`Mint successful on attempt ${attempt}`);
        return tx;
      } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage.includes("nonce too low") || errorMessage.includes("NONCE_EXPIRED")) {
          console.log(`Nonce error detected [${nonce}], retrieveing new nonce`);
          nonce = await wallet.getNonce();

        } else if (errorMessage.includes("replacement transaction underpriced") || errorMessage.includes("REPLACEMENT_UNDERPRICED") || errorMessage.includes("intrinsic gas too low")) {
          console.log(`Underpriced error detected [${gasLimit}], increasing gas limit [${gasLimit+20_000}]`);
          gasLimit += 20_000;

        } else {
          console.error(
            `Mint Failed, attempt: ${attempt}, nonce:`,
            nonce,
            "gasLimit:",
            gasLimit,
            "error: ",
            errorMessage
          );
          throw error;
        }
  
        if (attempt === maxRetries) {
          console.error("Max retries reached, throwing last error");
          throw error;
        }
      }
    }
  }

  public async mint(params: MintSingleNFTParams, apiKey: string): Promise<MintResult> {
    const minterPvk = JSON.parse(process.env.MINTER_KEYS || '{}')[apiKey];
    const wallet = new ethers.Wallet(minterPvk, this.provider);
    const contract = this.getEthersContract({laosContractAddress: params.laosContractAddress, abi: EvolutionCollectionAbi, wallet});
    const assetJson: AssetMetadata = {
      name: `${params.assetMetadata.name} `,
      description: `${params.assetMetadata.description}`,
      image: `${params.assetMetadata.image}`,
      attributes: params.assetMetadata.attributes,
    };
    const ipfsCid = await this.ipfsService.uploadAssetMetadataToIPFS(assetJson, params.assetMetadata.name);
    let tx: any;
    try {
      tx = await this.mintNFTWithRetries(contract, params, ipfsCid, wallet, 500000, 5);
      
      const receipt = await this.retryOperation(
        () => this.provider.waitForTransaction(tx.hash, 1, 14000),
        20
      );
      
      const tokenId = this.extractTokenId(receipt, contract, 'MintedWithExternalURI');
      return {
        status: "success",
        tokenId: tokenId.toString(),
        tx: tx?.hash,
      };
    } catch (error: any) {
      console.error("Minting Failed:", error.message);
      return {
        status: "failed",
        tx: tx?.hash,
        error: error.message,
      };
    }
  }

  private getEthersContract({laosContractAddress, abi, wallet}: {laosContractAddress: string, abi: any, wallet: ethers.Wallet}) {
    return new ethers.Contract(laosContractAddress, abi, wallet);
  }


  private async batchMintNFTWithRetries(
    contract: any,
    tokens: {tokenUri: string, mintTo: string}[],    
    wallet: ethers.Wallet,
    initialGasLimit: number,
    maxRetries: number
  ): Promise<any> {
    let nonce = await wallet.getNonce();
    let gasLimit = initialGasLimit;
    const randoms = Array.from({ length: tokens.length }, () => this.randomUint96());

    const { tokenUris, recipients } = tokens.reduce<{ tokenUris: string[], recipients: string[] }>((acc, token) => {
      acc.tokenUris.push(token.tokenUri);
      acc.recipients.push(token.mintTo);
      return acc;
    }, { tokenUris: [], recipients: [] });

    gasLimit = 20_000 * tokenUris.length + initialGasLimit;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log("Minting NFT to:", recipients, "nonce:", nonce);
        // recipients, randoms, uris, options
        const tx = await contract.mintWithExternalURIBatch(recipients, randoms, tokenUris, {
          nonce: nonce,
          gasLimit: gasLimit
        });
  
        console.log(`Mint successful on attempt ${attempt}`);
        return tx;
      } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage.includes("nonce too low") || errorMessage.includes("NONCE_EXPIRED")) {
          console.log(`Nonce error detected [${nonce}], retrieveing new nonce`);
          nonce = await wallet.getNonce();
        } else if (errorMessage.includes("replacement transaction underpriced") || errorMessage.includes("REPLACEMENT_UNDERPRICED") || errorMessage.includes("intrinsic gas too low")) {
          console.log(`Underpriced error detected [${gasLimit}], increasing gas limit [${gasLimit*2}]`);
          gasLimit *= 2;
        } else {
          console.error(
            `Mint Failed, attempt: ${attempt}, nonce:`,
            nonce,
            "gasLimit:",
            gasLimit,
            "error: ",
            errorMessage
          );
          throw error;
        }
  
        if (attempt === maxRetries) {
          console.error("Max retries reached, throwing last error");
          throw error;
        }
      }
    }
  }

  public async batchMint(params: BatchMintNFTParams, apiKey: string): Promise<BatchMintResult> {
    const minterPvk = JSON.parse(process.env.MINTER_KEYS || '{}')[apiKey];
    const wallet = new ethers.Wallet(minterPvk, this.provider);
    const contract = this.getEthersContract({laosContractAddress: params.laosBatchMinterContractAddress, abi: BatchMinterAbi, wallet});
    let tx: any;
    try {
      tx = await this.batchMintNFTWithRetries(contract, params.tokens, wallet, 50_000, 5);
      
      const receipt = await this.retryOperation(
        () => this.provider.waitForTransaction(tx.hash, 1, 14000),
        20
      );
      
      const tokenIds = this.extractTokenIds(receipt, 'MintedWithExternalURI');
      return {
        status: "success",
        tokenIds: tokenIds.map(bigintValue => bigintValue.toString()),
        tx: tx?.hash,
      };
    } catch (error: any) {
      console.error("Minting Failed:", error.message);
      return {
        status: "failed",
        tokenIds: [],
        tx: tx?.hash,
        error: error.message,
      };
    }
  }

  public async evolve(params: EvolveNFTParams, apiKey: string): Promise<EvolveResult> {
    const minterPvk = JSON.parse(process.env.MINTER_KEYS || '{}')[apiKey];
    const wallet = new ethers.Wallet(minterPvk, this.provider);
    const contract = this.getEthersContract({laosContractAddress: params.laosContractAddress, abi: EvolutionCollectionAbi, wallet});
    const assetJson: AssetMetadata = {
      name: `${params.assetMetadata.name}`,
      description: `${params.assetMetadata.description}`,
      image: `${params.assetMetadata.image}`,
      attributes: params.assetMetadata.attributes,
    };
    const nonce = await wallet.getNonce();
    const ipfsCid = await this.ipfsService.uploadAssetMetadataToIPFS(assetJson, params.assetMetadata.name);
    let tx: any;
    try {
      const tokenUri = `ipfs://${ipfsCid}`;
      console.log('tokenUri:', tokenUri);
      console.log("Evolving NFT with tokenId:", params.tokenId, "nonce:", nonce);
      tx = await contract
        .evolveWithExternalURI(params.tokenId, tokenUri, { nonce, gasLimit: 1000000 })
        .catch((error: Error) => {
          console.error(
            "Evolve Failed, nonce:",
            nonce,
            "error: ",
            error.message
          );
          throw error;
        });

      const receipt = await this.retryOperation(
        () => this.provider.waitForTransaction(tx.hash, 1, 14000),
        20
      );
      const tokenId = this.extractTokenId(receipt, contract, 'EvolvedWithExternalURI');
      return {
        status: "success",
        tokenId: tokenId.toString(),
        tokenUri: tokenUri,
        tx: tx?.hash,
      };
    } catch (error: any) {
      console.error("Evolving Failed:", error.message);
      return {
        status: "failed",
        tx: tx?.hash,
        error: error.message,
      };
    }
  }

  private extractTokenId(receipt: ethers.TransactionReceipt, contract: ethers.Contract, eventName: EventName): bigint {
    if (!receipt || !receipt.status || receipt.status !== 1) {
        throw new Error("Receipt status is not 1");
    }
    const log = receipt.logs[0] as any;
    const logDecoded = eventNameToEventTypeMap[eventName].decode(log);
    const { _tokenId } = logDecoded;
    return _tokenId;
  }

  private extractTokenIds(receipt: ethers.TransactionReceipt, eventName: EventName): bigint[] {
    if (!receipt || !receipt.status || receipt.status !== 1) {
      console.error("Receipt: ", receipt);
      throw new Error("Receipt status is not 1");
    }
  
    return receipt.logs
      .map(log => {
        try {
          const logDecoded = eventNameToEventTypeMap[eventName].decode(log as any);
          return logDecoded._tokenId;
        } catch (error) {
          // If decoding fails, it's likely not the event we're looking for
          return null;
        }
      })
      .filter((tokenId): tokenId is bigint => tokenId !== null);
  }

  private async retryOperation(operation: () => Promise<any>, maxRetries: number): Promise<any> {
    try {
      return await operation();
    } catch (error: any) {
      if (maxRetries <= 1) {
        console.error("Transaction Confirmation Failed:", error.message);
        throw error;
      } else {
        return this.retryOperation(operation, maxRetries - 1);
      }
    }
  }

  private randomUint96(): bigint {
    const getRandomValuesCompat = (arr: Uint32Array): Uint32Array => {
      if (typeof window === 'undefined') {
        return require('crypto').webcrypto.getRandomValues(arr);
      } else {
        return window.crypto.getRandomValues(arr);
      }
    };

    const arr1 = new Uint32Array(1);
    const arr2 = new Uint32Array(1);
    const arr3 = new Uint32Array(1);
    getRandomValuesCompat(arr1);
    getRandomValuesCompat(arr2);
    getRandomValuesCompat(arr3);

    const result = BigInt(arr1[0]) * 2n ** 64n + BigInt(arr2[0]) * 2n ** 32n + BigInt(arr3[0]);

    return this.isValidUint96(result) ? result : this.randomUint96();
  }

  private isValidUint96(value: bigint): boolean {
    return value < 2n ** 96n;
  }
}
