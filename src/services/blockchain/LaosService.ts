import { ethers } from "ethers";
import { MintSingleNFTParams, MintResult, AssetMetadata } from "../../types";
import { IPFSService } from "../ipfs/IPFSService";
import * as EvolutionCollection from "../../abi/EvolutionCollection";
import EvolutionCollectionAbi from '../../abi/contracts/EvolutionCollection.json';

export type MintConfig = {
  minterPvk: string;
  rpcMinter: string;
  minterLaosCollection: string;
};

export class LaosService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private contract: ethers.Contract;
  private ipfsService: IPFSService;

  constructor(config: MintConfig, ipfsService: IPFSService) {
    const { minterPvk, rpcMinter, minterLaosCollection } = config;
    if (!minterPvk) {
      throw new Error('Private key not found in environment variables');
    }
    this.provider = new ethers.JsonRpcProvider(rpcMinter);
    this.wallet = new ethers.Wallet(minterPvk, this.provider);
    this.contract = new ethers.Contract(minterLaosCollection, EvolutionCollectionAbi, this.wallet);
    this.ipfsService = ipfsService;
  }

  public async mintSingleNFT(params: MintSingleNFTParams): Promise<MintResult> {
    let tx: any;

    // Generate Asset Metadata
    const assetJson: AssetMetadata = {
      name: `${params.assetMetadata.name} `,
      description: `${params.assetMetadata.description}`,
      image: `${params.assetMetadata.image}`,
      attributes: params.assetMetadata.attributes,
    };
    const nonce = await this.wallet.getNonce();

    const ipfsCid = await this.ipfsService.uploadAssetMetadataToIPFS(assetJson, params.assetMetadata.name);
    try {
      const random = this.randomUint96();
      const tokenUri = `ipfs://${ipfsCid}`;
      console.log("Minting NFT to:", params.to, "nonce:", nonce);
      tx = await this.contract
        .mintWithExternalURI(params.to, random, tokenUri, { nonce, gasLimit: 1000000 })
        .catch((error: Error) => {
          console.error(
            "Mint Failed, nonce:",
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
      const tokenId = this.extractTokenId(receipt, this.contract);
      return {
        status: "success",
        tokenId: tokenId.toString(),
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

  private extractTokenId(receipt: ethers.TransactionReceipt, contract: ethers.Contract): bigint {
    const log = receipt.logs[0] as any;
    const logDecoded = EvolutionCollection.events.MintedWithExternalURI.decode(log);
    const { _tokenId } = logDecoded;
    return _tokenId;
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
