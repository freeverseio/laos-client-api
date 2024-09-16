//@TODO
import { CreateCollectionInput } from "../types/graphql/inputs/CreateCollectionInput";
import { LaosConfig, OwnershipChainConfig } from "../types";
import { CreateCollectionResponse } from "../types/graphql/outputs/CreateCollectionOutput";
import { ServiceHelper } from "./ServiceHelper";
import ClientService from "./db/ClientService";
import ContractService from "./db/ContractService";
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
    const { chainId, name, symbol } = input;

    try {
      const client = await ClientService.getClientByKey(apiKey);
      if (!client) {
        throw new Error('Invalid API key');
      }
      const contract = await ContractService.getClientContractByChain(client.id, chainId);
      if(contract){
        console.log(`You already have a collection on this chain: ${chainId}, collection address: ${contract.contractAddress}`);
      }
      // Create collection in LAOS
      let laosCollectionAddress;
      try {
        laosCollectionAddress = await this.serviceHelper.laosService.createLaosCollection(apiKey);
        console.log('laosCollectionAddress: ', laosCollectionAddress)
      } catch (error) {
        throw new Error(`Failed to create new LAOS collection: ${error}`);
      }

      // Create Ownershipchain collection
      let ownershipContractAddress;
      let batchMinterAddress;

      console.log("Deploying ownershipChain contract...");      
      let evochainTarget = "LAOS";
      if (process.env.RPC_MINTER?.toLocaleLowerCase().includes("sigma")) {
        evochainTarget = "LAOS_SIGMA";
      }
      const baseURI = this.serviceHelper.generateBaseUri(laosCollectionAddress, evochainTarget);
      if (!baseURI) {
        throw new Error("BaseURI is null");
      }
      ownershipContractAddress = await this.ownershipChainService.deployNewErc721universal( chainId, name, symbol, baseURI);
      console.log("OwnershipChain contract deployed at: ", ownershipContractAddress);

      // Deploy BatchMinter with owner ownerAddress
      batchMinterAddress = await this.serviceHelper.laosService.deployBatchMinterContract(apiKey);
      console.log("BatchMinter contract deployed at: ", batchMinterAddress);

      // Set owner of LaosColletion to batchMinter
      await this.serviceHelper.laosService.transferOwnership(laosCollectionAddress!, batchMinterAddress, apiKey);
      
      // Set Collection address to batchMinter
      await this.serviceHelper.laosService.setPrecompileAddress(batchMinterAddress, laosCollectionAddress!, apiKey);
      console.log("Contract properly created onchain");

      // Save contract to DB
      await ContractService.insertContract(client.id, chainId, ownershipContractAddress, laosCollectionAddress, batchMinterAddress);
      console.log("Contract saved to DB");

      return {
        chainId: chainId,
        name: name,
        symbol: symbol,
        contractAddress: ownershipContractAddress,
        batchMinterAddress: batchMinterAddress,
        laosAddress: laosCollectionAddress,
        success: true,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
