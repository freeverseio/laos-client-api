import { ethers } from "ethers";
import { BroadcastResult, OwnershipChainConfig, BroadcastParams } from "../../types";
import ERC721UniversalAbi from '../../abi/contracts/ERC721Universal.json';

export class OwnershipChainService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private contract: ethers.Contract;

  constructor(config: OwnershipChainConfig) {
    const { minterPvk, rpcOwnershipChain, ownershipChainContract } = config;
    if (!minterPvk) {
      throw new Error('Private key not found in environment variables');
    }
    this.provider = new ethers.JsonRpcProvider(rpcOwnershipChain);
    this.wallet = new ethers.Wallet(minterPvk, this.provider);
    this.contract = new ethers.Contract(ownershipChainContract, ERC721UniversalAbi, this.wallet);
  }

  public async broadcast(params: BroadcastParams): Promise<BroadcastResult> {
    let tx: any;

    const nonce = await this.wallet.getNonce();

    try {     
      console.log("Broadcasting tokenId:", params.tokenId);
      tx = await this.contract
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
        () => this.provider.waitForTransaction(tx.hash, 1, 14000),
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

}