import { MintInput } from "../types/graphql/inputs/MintInput";
import { LaosConfig, MintSingleNFTParams, MintResult, AssetMetadata } from "../types";
import { MintResponse } from "../types/graphql/outputs/MintOutput";
import { ServiceHelper } from "./ServiceHelper";

export class MintingService {
  private serviceHelper: ServiceHelper;

  constructor() {
    const mintConfig: LaosConfig = {
      minterPvk: process.env.MINTER_PVK || '',
      rpcMinter: process.env.RPC_MINTER || '',
      minterLaosCollection: process.env.MINTER_LAOS_COLLECTION || '',
    };

    this.serviceHelper = new ServiceHelper(mintConfig);
  }

  public async mint(input: MintInput): Promise<MintResponse> {
    const { mintTo, name, description, properties, image } = input;

    if (!image || 
        (!image.startsWith("ipfs://") && 
         !image.startsWith("data:image/") && 
         !image.startsWith("https://ipfs.io/ipfs/"))) {
      throw new Error("Invalid image format");
    }

    const attributes = this.serviceHelper.parseAssetAttributes(properties || '[]');

    const assetMetadata: AssetMetadata = {
      name: name || '',
      description: description || '',
      image: image,
      attributes: attributes,
    };

    const params: MintSingleNFTParams = {
      to: mintTo || '',
      assetMetadata: assetMetadata,
    };

    try {
      const result: MintResult = await this.serviceHelper.laosService.mintSingleNFT(params);
      if (result.status === "success") {
        return { tokenId: result.tokenId!, success: true };
      } else {
        throw new Error(result.error ?? "Minting failed"); // Use nullish coalescing operator
      }
    } catch (error) {
      console.error("Minting failed:", error);
      throw error;
    }
  }
}
