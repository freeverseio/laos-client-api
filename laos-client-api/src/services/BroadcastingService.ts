import { BroadcastInput } from "../types/graphql/inputs/BroadcastInput";
import { BroadcastParams, BroadcastResult, OwnershipChainConfig } from "../types";
import { BroadcastResponse } from "../types/graphql/outputs/BroadcastOutput";
import { OwnershipChainService } from "./blockchain/OwnershipChainService";
import ClientService from "./db/ClientService";
import ContractService from "./db/ContractService";


export class BroadcastingService {
  public ownershipChainService: OwnershipChainService;

  constructor() {
    const ownershipChainConfig: OwnershipChainConfig = {
      minterPvk: process.env.MINTER_PVK || '',
    };    
    this.ownershipChainService = new OwnershipChainService(ownershipChainConfig);
  }

  public async broadcast(input: BroadcastInput, apiKey: string): Promise<BroadcastResponse> {
    const { tokenId, chainId, ownershipContractAddress } = input;
    try {
      // Check the client exists an is active
      const client = await ClientService.getClientByKey(apiKey);
      console.log('Broadcast requested by client:', client.id);
      const contract = await ContractService.getClientContract(client.id, chainId!, ownershipContractAddress!);
      if (!contract) {
        throw new Error('Contract not found');
      }
      const params: BroadcastParams = {
        tokenId: tokenId!,
        chainId: chainId!,
        ownershipContractAddress: ownershipContractAddress!,
      };
    
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
