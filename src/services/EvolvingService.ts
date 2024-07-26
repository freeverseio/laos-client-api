import { EvolveInput } from "../types/graphql/inputs/EvolveInput";
import { MintConfig, AssetMetadata } from "../types";
import { EvolveResponse } from "../types/graphql/outputs/EvolveOutput";
import { ServiceHelper } from "./ServiceHelper";

export class EvolvingService {
  private serviceHelper: ServiceHelper;

  constructor() {
    const evolveConfig: MintConfig = {
      minterPvk: process.env.EVOLVER_PVK || '',
      rpcMinter: process.env.RPC_EVOLVER || '',
      minterLaosCollection: process.env.EVOLVER_LAOS_COLLECTION || '',
    };

    this.serviceHelper = new ServiceHelper(evolveConfig);
  }

  public async evolve(input: EvolveInput): Promise<EvolveResponse> {
    const { tokenId, name, description, properties, image } = input;

    if (!image || 
        (!image.startsWith("ipfs://") && 
         !image.startsWith("data:image/") && 
         !image.startsWith("https://ipfs.io/ipfs/"))) {
      throw new Error("Invalid image format");
    }

    const attributes = this.serviceHelper.parseAssetAttributes(properties || '[]'); // Ensure attributes is an array

    const assetMetadata: AssetMetadata = {
      name: name || '',
      description: description || '',
      image: image,
      attributes: attributes, // Correctly assign the parsed attributes
    };

    // Evolve logic goes here
    return {
      success: true,
      tokenId: tokenId!,
    };
  }
}