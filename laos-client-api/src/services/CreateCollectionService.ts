//@TODO
import { CreateCollectionInput } from "../types/graphql/inputs/CreateCollectionInput";
import { LaosConfig, AssetMetadata } from "../types";
import { CreateCollectionResponse } from "../types/graphql/outputs/CreateCollectionOutput";
import { ServiceHelper } from "./ServiceHelper";
import { ethers } from "ethers";
import ClientService from "./db/ClientService";
import EvolutionCollectionFactoryAbi from '../contracts/EvolutionCollectionFactory.json';


export class CreateCollectionService {
  private serviceHelper: ServiceHelper;

  constructor() {
    const config: LaosConfig = {
      minterPvks: process.env.MINTER_KEYS || '',
      rpcMinter: process.env.RPC_MINTER || '',
    };
    this.serviceHelper = new ServiceHelper(config);
  }

  /**
   * CreateCollections up to multiple NFTs in a batch.
   * @param {CreateCollectionInput} input - The createCollection input data.
   * @param {string} apiKey - The API key for authentication.
   * @returns {Promise<CreateCollectionResponse>} - The result of the createCollection operation.
   */
  public async createCollection(input: CreateCollectionInput, apiKey: string): Promise<CreateCollectionResponse> {
    const { name, chainId, ownerAddress } = input; // TODO symbol?

    try {            

      // retrieve contract from db
      const client = await ClientService.getClientByKey(apiKey);
      
      const params = {
        name,
        chainId,
        ownerAddress
      };

      // Create collection in LAOS     

      try {
        const result = await this.serviceHelper.laosService.createLaosCollection(ownerAddress, apiKey);
        console.log('result: ', result);
        // if (result.status === "success") {
        //   return { 
        //     tokenId: result.tokenId!, 
        //     success: true,
        //     tokenUri: result.tokenUri || '',
        //     tx: result.tx || ''
        //   };
        // } else {
        //   throw new Error(result.error ?? "Evolving failed"); // Use nullish coalescing operator
        // }
      } catch (error) {
        throw new Error(`Failed to evolve NFT: ${error}`);
      }

      // Create Ownershipchain collection
      // Deploy BatchMinter with owner ownerAddress
      // Set owner of LaosColletion to batchMinter
      // Set Collection address to batchMinter

      const result = {
        status: "success",
        name: name,
        chainId: chainId,
        contractAddress: "0x0000000000000000000000000000000000000000",
        batchMinterAddress: "0x0000000000000000000000000000000000000000",
        address: "0x0000000000000000000000000000000000000000",
        success: true
      }
      if (result.status === "success") {
        return { 
          name: result.name,
          chainId: result.chainId,
          contractAddress: result.contractAddress,
          batchMinterAddress: result.batchMinterAddress,
          laosAddress: result.address,          
          success: true,
        };
      } else {
        throw new Error(result.status ?? "CreateCollection failed");
      }
    } catch (error) {
      console.error(`Error creating collection [${name}] on chainId [${chainId}]. Error:`, error);
      throw error;
    }
  }
}
