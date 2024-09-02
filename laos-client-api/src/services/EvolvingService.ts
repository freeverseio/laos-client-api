import { EvolveInput } from "../types/graphql/inputs/EvolveInput";
import { LaosConfig, AssetMetadata, EvolveResult } from "../types";
import { EvolveResponse } from "../types/graphql/outputs/EvolveOutput";
import { ServiceHelper } from "./ServiceHelper";
import { getClientByKey } from "./db/client";
import { getClientContract } from "./db/contract";

export class EvolvingService {
  private serviceHelper: ServiceHelper;

  constructor() {
    const evolveConfig: LaosConfig = {
      minterPvks: process.env.MINTER_KEYS || '',
      rpcMinter: process.env.RPC_MINTER || '',
    };
    this.serviceHelper = new ServiceHelper(evolveConfig);
  }

  public async evolve(input: EvolveInput, apiKey: string): Promise<EvolveResponse> {
    const { contractAddress, tokenId, name, description, attributes, image, chainId } = input;
    if (!contractAddress) {
      throw new Error('Contract address is required');
    }
    if(!chainId) {
      throw new Error('Chain id is required');
    }

    const imageUrl = await this.serviceHelper.handleImageUpload(image || '');

    const parsedAttributes = this.serviceHelper.parseAssetAttributes(attributes || '[]'); // Ensure attributes is an array

    // retrieve contract from db
    const client = await getClientByKey({ key: apiKey });
    const contract = await getClientContract({clientId: client?.id, chainId: chainId, contract: contractAddress});
    if (!contract) {
      throw new Error('Contract not found');
    }

    const assetMetadata: AssetMetadata = {
      name: name || '',
      description: description || '',
      image: imageUrl,
      attributes: parsedAttributes, 
    };
    try {
      const result: EvolveResult = await this.serviceHelper.laosService.evolve({
        tokenId: tokenId!, 
        assetMetadata, 
        laosContractAddress: contract.laosContract,
      }, apiKey);
      if (result.status === "success") {
        return { 
          tokenId: result.tokenId!, 
          success: true,
          tokenUri: result.tokenUri || '',
          tx: result.tx || ''
        };
      } else {
        throw new Error(result.error ?? "Evolving failed"); // Use nullish coalescing operator
      }
    } catch (error) {
      throw new Error(`Failed to evolve NFT: ${error}`);
    }

   
  }
}