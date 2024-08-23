import { EvolveInput } from "../types/graphql/inputs/EvolveInput";
import { LaosConfig, AssetMetadata, EvolveResult } from "../types";
import { EvolveResponse } from "../types/graphql/outputs/EvolveOutput";
import { ServiceHelper } from "./ServiceHelper";

export class EvolvingService {
  private serviceHelper: ServiceHelper;

  constructor() {
    const evolveConfig: LaosConfig = {
      minterPvk: process.env.MINTER_PVK || '',
      rpcMinter: process.env.RPC_MINTER || '',
    };
    this.serviceHelper = new ServiceHelper(evolveConfig);
  }

  public async evolve(input: EvolveInput): Promise<EvolveResponse> {
    const { laosContractAddress, tokenId, name, description, attributes, image } = input;

    const imageUrl = await this.serviceHelper.handleImageUpload(image || '');

    const parsedAttributes = this.serviceHelper.parseAssetAttributes(attributes || '[]'); // Ensure attributes is an array

    const assetMetadata: AssetMetadata = {
      name: name || '',
      description: description || '',
      image: imageUrl,
      attributes: parsedAttributes, 
    };
    try {
      const result: EvolveResult = await this.serviceHelper.laosService.evolve({tokenId: tokenId!, assetMetadata, laosContractAddress: laosContractAddress!});
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