import { MintInput } from "../types/graphql/inputs/MintInput";
import { BatchMintInput } from "../types/graphql/inputs/BatchMintInput";
import { LaosConfig, MintSingleNFTParams, MintResult, AssetMetadata, BatchMintNFTParams, BatchMintResult } from "../types";
import { MintResponse } from "../types/graphql/outputs/MintOutput";
import { BatchMintResponse } from "../types/graphql/outputs/BatchMintOutput";
import { ServiceHelper } from "./ServiceHelper";
import { OwnershipContracService } from "./graphql/OwnershipContracService";
import { ethers } from "ethers";
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
  public async batchMint(input: BatchMintInput, apiKey: string): Promise<BatchMintResponse> {
    const { contractAddress, chainId, tokens } = input;
    const expandedTokens = tokens.map(token => {
      const { mintTo, name, description, attributes, image } = token;
      const parsedAttributes = this.serviceHelper.parseAssetAttributes(attributes || '[]');
      const assetMetadata: AssetMetadata = {
        name: name || '',
        description: description || '',
        image: image || '',
        attributes: parsedAttributes,
      };
//      const cid = await this.serviceHelper.ipfsService.getCid(assetMetadata);
//const tokenUri = `ipfs://${cid}`;
const tokenUri = `ipfs://TODO`;
      //this.serviceHelper.ipfsService.uploadAssetMetadataToIPFS(assetMetadata, name);

      return mintTo.map(address => {

        if (!ethers.isAddress(address)) {
          throw new Error("Invalid recipient address");
        }
    
        const formattedRecipient = ethers.getAddress(address);    
        console.log("Formatted recipient address:", formattedRecipient);
        return {
        tokenUri: tokenUri,
        mintTo: formattedRecipient
      }});
    }).flat();

    // TODO get from configMap instead of indexer
    const ownershipService = new OwnershipContracService();
    const ownershipContract = await ownershipService.getOwnershipContract(Number(chainId), contractAddress!);
    const params: BatchMintNFTParams = {
      laosBatchMinterContractAddress: "0x7a263f4ef627f35850e478196b4c9ca33303d9e0", // TODO set it dinamically retrieved from configMap
      tokens: expandedTokens,      
    };
    try {
      const result: BatchMintResult = await this.serviceHelper.laosService.batchMint(params, apiKey);
      if (result.status === "success") {
        return { tokenIds: result.tokenIds, success: true };
      } else {
        throw new Error(result.error ?? "Minting failed");
      }
    } catch (error) {
      console.error("Minting failed:", error);
      throw error;
    }
  }
}