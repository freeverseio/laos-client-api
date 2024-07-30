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
    };

    this.serviceHelper = new ServiceHelper(mintConfig);
  }

  public async mint(input: MintInput): Promise<MintResponse> {
    const { laosContractAddress, mintTo, name, description, attributes, image } = input;

    const imageUrl = await this.serviceHelper.handleImageUpload(image || '');
    const parsedAttributes = this.serviceHelper.parseAssetAttributes(attributes || '[]');

    const assetMetadata: AssetMetadata = {
      name: name || '',
      description: description || '',
      image: imageUrl,
      attributes: parsedAttributes,
    };

    const params: MintSingleNFTParams = {
      laosContractAddress: laosContractAddress!,
      to: mintTo || '',
      assetMetadata: assetMetadata,
    };

    try {
      const result: MintResult = await this.serviceHelper.laosService.mint(params);
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
