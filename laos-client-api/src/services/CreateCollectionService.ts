//@TODO
import { CreateCollectionInput } from "../types/graphql/inputs/CreateCollectionInput";
import { LaosConfig, AssetMetadata, OwnershipChainConfig } from "../types";
import { CreateCollectionResponse } from "../types/graphql/outputs/CreateCollectionOutput";
import { ServiceHelper } from "./ServiceHelper";
import { ethers } from "ethers";
import ClientService from "./db/ClientService";
import { OwnershipChainService } from "./blockchain/OwnershipChainService";


export class CreateCollectionService {
  private serviceHelper: ServiceHelper;
  private ownershipChainService: OwnershipChainService;

  constructor() {
    const config: LaosConfig = {
      minterPvks: process.env.MINTER_KEYS || '',
      rpcMinter: process.env.RPC_MINTER || '',
    };
    this.serviceHelper = new ServiceHelper(config);

    const ownershipChainConfig: OwnershipChainConfig = {
      minterPvk: process.env.MINTER_PVK || '',
      ownershipChainContract: '0xaaf54526c508d573d402bf05a9a5e54f09302adf', // TODO set ownership contract
      rpcOwnershipChain: 'https://polygon.meowrpc.com', // TODO set ownership rpc
    };    
    this.ownershipChainService = new OwnershipChainService(ownershipChainConfig);
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
      const client = await ClientService.getClientByKey(apiKey);
      if(!client) {
        throw new Error('Invalid API key');
      }     

      // Create collection in LAOS
      let laosCollectionAddress;
      try {
        console.log("Creating LAOS Collection...");
        let laosCollectionAddress = await this.serviceHelper.laosService.createLaosCollection(ownerAddress, apiKey);
        console.log('laosCollectionAddress: ', laosCollectionAddress);
        
      } catch (error) {
        throw new Error(`Failed to create new LAOS collection: ${error}`);
      }

      // Create Ownershipchain collection
      let ownershipContractAddress; 
      try{
        console.log("Deploying ownershipChain contract...");      
        const symbol = "MCOL"; // TODO add to input
        const baseURI = "https://baseuri.com/" + laosCollectionAddress; // TODO Sigma/LAOS
        // ownershipContractAddress = await this.ownershipChainService.deployNewErc721universal(ownerAddress, chainId, name, symbol, baseURI);
        // console.log("OwnershipChain contract deployed at: ", ownershipContractAddress);
        const batchMinterAddress = await this.serviceHelper.laosService.deployBatchMinterContract(ownerAddress, apiKey);
        console.log("BatchMinter contract deployed at: ", batchMinterAddress);
      } catch (error) {
        throw new Error(`Failed to deploy ownershipChain contract: ${error}`);
      }


      // Deploy BatchMinter with owner ownerAddress
      // TODO

      // Set owner of LaosColletion to batchMinter
      // TODO
      
      // Set Collection address to batchMinter
      // TODO

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
