import { ethers } from "ethers";
import { BroadcastResult, OwnershipChainConfig, BroadcastParams } from "../../types";
import ERC721UniversalAbi from '../../abi/contracts/ERC721Universal.json';

export class OwnershipChainService {
  private minterPvk: string = '';

  constructor(config: OwnershipChainConfig) {
    const { minterPvk} = config;
    if (!minterPvk) {
      throw new Error('Private key not found in environment variables');
    }
    this.minterPvk = minterPvk;
  }

  public async broadcast(params: BroadcastParams): Promise<BroadcastResult> {
    let tx: any;

    const rpcOwnershipChain = this.getChainRpcbyChainId(params.chainId);
    const ownershipChainContract = params.ownershipContractAddress;
    const provider = new ethers.JsonRpcProvider(rpcOwnershipChain);
    const wallet = new ethers.Wallet(this.minterPvk, provider);
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
        { chainID: "1", rpcUrl: "https://ethereum-rpc.publicnode.com" },
        { chainID: "137", rpcUrl: "https://polygon-rpc.com/" },
    ];

    const chain = chains.find(c => c.chainID === chainId);
    if (chain) {
      return chain.rpcUrl;
    } else {
      console.error('Chain ID not supported:', chainId);
      throw new Error("Chain ID not supported");
    }
  }

}