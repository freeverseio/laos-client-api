import { BroadcastInput } from "../types/graphql/inputs/BroadcastInput";
import { BroadcastParams, BroadcastResult, OwnershipChainConfig } from "../types";
import { BroadcastResponse } from "../types/graphql/outputs/BroadcastOutput";
import { OwnershipChainService } from "./blockchain/OwnershipChainService";


export class BroadcastingService {
  public ownershipChainService: OwnershipChainService;

  constructor() {
    const ownershipChainConfig: OwnershipChainConfig = {
      minterPvk: process.env.MINTER_PVK || '',
      ownershipChainContract: '0xaaf54526c508d573d402bf05a9a5e54f09302adf', // TODO set ownership contract
      rpcOwnershipChain: 'https://polygon.meowrpc.com', // TODO set ownership rpc
    };    
    this.ownershipChainService = new OwnershipChainService(ownershipChainConfig);
  }

  public async broadcast(input: BroadcastInput): Promise<BroadcastResponse> {
    const { tokenId, chainId, ownershipContractAddress } = input;
    
    const params: BroadcastParams = {
      tokenId: tokenId!,
      chainId: chainId!,
      ownershipContractAddress: ownershipContractAddress!,
    };

    try {
      const result: BroadcastResult = await this.ownershipChainService.broadcast(params);
      if (result.status === "success") {
        return { tokenId: result.tokenId!, success: true };
      } else {
        throw new Error(result.error ?? "Broadcasting failed"); // Use nullish coalescing operator
      }
    } catch (error) {
      console.error("Broadcasting failed:", error);
      throw error;
    }
  }
}
