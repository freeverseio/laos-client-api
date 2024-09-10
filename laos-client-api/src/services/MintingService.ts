import { AttributeInput, MintInput } from "../types/graphql/inputs/MintInput";
import { LaosConfig, MintSingleNFTParams, MintResult, AssetMetadata, BatchMintNFTParams, BatchMintResult } from "../types";
import { MintResponse } from "../types/graphql/outputs/MintOutput";
import { ServiceHelper } from "./ServiceHelper";
import { ethers } from "ethers";
import { getClientContract } from "./db/contract";
import { getClientByKey } from "./db/client";

export class MintingService {
  private serviceHelper: ServiceHelper;

  constructor() {
    const config: LaosConfig = {
      minterPvks: process.env.MINTER_KEYS || '',
      rpcMinter: process.env.RPC_MINTER || '',
    };
    this.serviceHelper = new ServiceHelper(config);
  }

  /**
   * Prepares asset metadata from the given token input.
   * @param token The token input data.
   * @returns {AssetMetadata} The prepared asset metadata.
   */
  private prepareAssetMetadata(token: { name?: string, description?: string, attributes?: AttributeInput[], image?: string }): AssetMetadata {
    const { name, description, attributes, image } = token;
    const parsedAttributes = attributes? attributes : [];
    return {
      name: name || '',
      description: description || '',
      image: image || '',
      attributes: parsedAttributes,
    };
  }

  /**
   * Mints up to multiple NFTs in a batch.
   * @param {MintInput} input - The minting input data.
   * @param {string} apiKey - The API key for authentication.
   * @returns {Promise<MintResponse>} - The result of the minting operation.
   */
  public async mint(input: MintInput, apiKey: string): Promise<MintResponse> {
    const { contractAddress, chainId, tokens } = input;

    try {
      const expandedTokens = await Promise.all(tokens.map(async token => {
        const assetMetadata = this.prepareAssetMetadata(token);

        try {
          const cid = await this.serviceHelper.ipfsService.getCid(assetMetadata);
          const tokenUri = `ipfs://${cid}`;
          this.serviceHelper.ipfsService.uploadAssetMetadataToIPFS(assetMetadata, token.name);
          return Promise.all(token.mintTo.map(async address => {
            if (!ethers.isAddress(address)) {
              throw new Error("Invalid recipient address");
            }
            const formattedRecipient = ethers.getAddress(address);
            return {
              tokenUri: tokenUri,
              mintTo: formattedRecipient
            };
          }));
        } catch (error) {
          console.error("IPFS upload or address formatting failed:", error);
          throw error;
        }
      }));

      const flatTokens = expandedTokens.flat();

      // retrieve contract from db
      const client = await getClientByKey({ key: apiKey });
      const contract = await getClientContract({clientId: client?.id, chainId: chainId, contract: contractAddress});
      if (!contract) {
        throw new Error('Contract not found');
      }

      const params: BatchMintNFTParams = {
        laosBatchMinterContractAddress: contract.batchMinterContract,
        tokens: flatTokens,
      };

      const result: BatchMintResult = await this.serviceHelper.laosService.batchMint(params, apiKey);
      if (result.status === "success") {
        return { 
          tokenIds: result.tokenIds, 
          success: true,
          numberOfTokens: result.numberOfTokens
        };
      } else {
        throw new Error(result.error ?? "Minting failed");
      }
    } catch (error) {
      console.error(`Batch minting failed for contract: ${contractAddress} on chainId: ${chainId}`, error);
      throw error;
    }
  }
}
