import { ethers } from "ethers";
import { BroadcastResult, OwnershipChainConfig, BroadcastParams } from "../../types";
import ERC721UniversalAbi from '../../abi/contracts/ERC721Universal.json';
import { ERC721UniversalBytecode }from '../../abi/contracts/ERC721UniversalBytecode';
import { ContractService } from "./ContractService";
import { DeploymentResult } from "../../types";
export class OwnershipChainService {
  private pvks: string = '';

  constructor(config: OwnershipChainConfig) {
    const { pvks} = config;
    if (!pvks) {
      throw new Error('Private keys not found in environment variables');
    }
    this.pvks = pvks;
  }

  public async broadcast(params: BroadcastParams, apiKey: string): Promise<BroadcastResult> {
    const pvk = JSON.parse(this.pvks || '{}')[apiKey];
    if (!pvk) {
      throw new Error('Private key not found for API key');
    }
    let tx: any;
    const rpcOwnershipChain = this.getChainRpcbyChainId(params.chainId);
    const ownershipChainContract = params.ownershipContractAddress;
    const provider = new ethers.JsonRpcProvider(rpcOwnershipChain);
    const wallet = new ethers.Wallet(pvk, provider);
    const contract = new ethers.Contract(ownershipChainContract, ERC721UniversalAbi, wallet);

    const nonce = await wallet.getNonce();

    try {     
      console.log("Broadcasting tokenId:", params.tokenId);
      tx = await contract
        .broadcastSelfTransfer(params.tokenId, { nonce, gasLimit: 1000000 })
        .catch((error: Error) => {
          console.error(
            "broadcastSelfTransfer Failed, nonce:",
            nonce,
            "error: ",
            error.message
          );
          throw error;
        });

      const receipt = await this.retryOperation(
        () => provider.waitForTransaction(tx.hash, 1, 14000),
        20
      );

      return {
        status: "success",
        tokenId: params.tokenId,
        tx: tx?.hash,
      };
    } catch (error: any) {
      console.error("BroadcastSelfTransfer Failed:", error.message);
      return {
        status: "failed",
        tx: tx?.hash,
        error: error.message,
      };
    }
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

  private getChainRpcbyChainId(chainId: string): string {
    // TOOD envVar
    const chains = [
        { chainId: "1", rpcUrl: "https://ethereum-rpc.publicnode.com" },
        { chainId: "137", rpcUrl: "https://polygon-rpc.com/" },
    ];

    const chain = chains.find(c => c.chainId === chainId);
    if (chain) {
      return chain.rpcUrl;
    } else {
      console.error('Chain ID not supported:', chainId);
      throw new Error("Chain ID not supported");
    }
  }

  public async deployNewErc721universal( chainId: string, name: string, symbol: string, baseURI: string, apiKey: string): Promise<any> {
    const pvk = JSON.parse(this.pvks || '{}')[apiKey];
    if (!pvk) {
      throw new Error('Private key not found for API key');
    }
    const rpcOwnershipChain = this.getChainRpcbyChainId(chainId);
    const provider = new ethers.JsonRpcProvider(rpcOwnershipChain);
    const wallet = new ethers.Wallet(pvk, provider);
    const deployer = new ContractService(pvk, rpcOwnershipChain);
    try {
      const deploymentResult: DeploymentResult = await deployer.deployContract(
        ERC721UniversalAbi,
        ERC721UniversalBytecode,
        [wallet.address, name, symbol, baseURI]
      );

      return deploymentResult.contractAddress;
    } catch (error) {
      console.error("Error deploying ERC721Universal contract:", error);
      throw error;
    }
  }

 

}