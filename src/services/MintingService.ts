// src/services/MintingService.ts
import { MintInput } from "../types/graphql/inputs/MintInput";
import { MintService } from "./blockchain/MintService";
import { IPFSService } from "./ipfs/IPFSService";
import { MintConfig, MintSingleNFTParams, MintResult, AssetMetadata, AssetAttributes } from "../types";
import { MintResponse } from "../types/graphql/outputs/MintOutput";

export class MintingService {
  private ipfsService: IPFSService;
  private mintService: MintService;

  constructor() {
    const mintConfig: MintConfig = {
      minterPvk: process.env.MINTER_PVK || '',
      rpcMinter: process.env.RPC_MINTER || '',
      minterLaosCollection: process.env.MINTER_LAOS_COLLECTION || '',
    };

    const pinataApiKey = process.env.PINATA_API_KEY || '';
    const pinataApiSecret = process.env.PINATA_API_SECRET || '';

    if (!pinataApiKey || !pinataApiSecret) {
      throw new Error('Pinata API key and secret are required');
    }

    this.ipfsService = new IPFSService(pinataApiKey, pinataApiSecret);
    this.mintService = new MintService(mintConfig, this.ipfsService);
  }

  private parseAssetAttributes(jsonString: string): AssetAttributes[] {
    try {
      const parsedArray = JSON.parse(jsonString);
      if (!Array.isArray(parsedArray)) {
        throw new Error('JSON is not an array');
      }

      parsedArray.forEach((item, index) => {
        if (
          typeof item.trait_type !== 'string' ||
          typeof item.value !== 'string'
        ) {
          throw new Error(`Invalid JSON structure at index ${index}`);
        }
      });

      return parsedArray as AssetAttributes[];
    } catch (error) {
      throw new Error(`Failed to parse JSON string: ${error}`);
    }
  }

  public async mint(input: MintInput): Promise<MintResponse> {
    const { mintTo, name, description, properties, image } = input;

    if (!image || 
        (!image.startsWith("ipfs://") && 
         !image.startsWith("data:image/") && 
         !image.startsWith("https://ipfs.io/ipfs/"))) {
      throw new Error("Invalid image format");
    }

    const attributes = this.parseAssetAttributes(properties || '[]'); // Ensure attributes is an array

    const assetMetadata: AssetMetadata = {
      name: name || '',
      description: description || '',
      image: image,
      attributes: attributes, // Correctly assign the parsed attributes
    };

    const params: MintSingleNFTParams = {
      to: mintTo || '',
      assetMetadata: assetMetadata,
    };

    try {
      const result: MintResult = await this.mintService.mintSingleNFT(params);
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