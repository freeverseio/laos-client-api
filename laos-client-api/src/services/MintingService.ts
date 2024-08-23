import { MintInput } from "../types/graphql/inputs/MintInput";
import { LaosConfig, MintSingleNFTParams, MintResult, AssetMetadata } from "../types";
import { MintResponse } from "../types/graphql/outputs/MintOutput";
import { ServiceHelper } from "./ServiceHelper";
import { OwnershipContracService } from "./graphql/OwnershipContracService";
export class MintingService {
  private serviceHelper: ServiceHelper;

  constructor() {
    const config: LaosConfig = {
      minterPvks: process.env.MINTER_KEYS || '',
      rpcMinter: process.env.RPC_MINTER || '',
    };
    this.serviceHelper = new ServiceHelper(config);
  }

  public async mint(input: MintInput, apiKey: string): Promise<MintResponse> {
    const { contractAddress, mintTo, name, description, attributes, image, chainId } = input;

    const imageUrl = await this.serviceHelper.handleImageUpload(image || '');
    const parsedAttributes = this.serviceHelper.parseAssetAttributes(attributes || '[]');

    const ownershipService = new OwnershipContracService();
    const ownershipContract = await ownershipService.getOwnershipContract(Number(chainId), contractAddress!);

    const assetMetadata: AssetMetadata = {
      name: name || '',
      description: description || '',
      image: imageUrl,
      attributes: parsedAttributes,
    };

    const params: MintSingleNFTParams = {
      laosContractAddress: ownershipContract?.laosContract!,
      to: mintTo || '',
      assetMetadata: assetMetadata,
    };

    try {
      const result: MintResult = await this.serviceHelper.laosService.mint(params, apiKey);
      if (result.status === "success") {
        return { tokenId: result.tokenId!, success: true };
      } else {
        throw new Error(result.error ?? "Minting failed"); 
      }
    } catch (error) {
      console.error("Minting failed:", error);
      throw error;
    }
  }
}