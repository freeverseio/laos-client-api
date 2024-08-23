import { AssetMetadata } from "./asset";

export interface Property {
  [key: string]: string;
}

export interface Trait {
  trait_type: string;
  value: string;
}

export type MintRequestBody = {
  mintTo: string;
  name: string;
  description: string;
  image: string;
  properties: Property[];
};
  
export interface MintSingleNFTParams {
  laosContractAddress: string;
  to: string;
  assetMetadata: AssetMetadata;
}

export interface EvolveNFTParams {
  laosContractAddress: string;
  tokenId: string;
  assetMetadata: AssetMetadata;
}

export interface MintResult {
  status: string;
  tokenId?: string;
  contractAddress?: string;
  tx?: string;
  error?: string;
}

export interface EvolveResult {
  status: string;
  tokenId?: string;
  tokenUri?: string;
  contractAddress?: string;
  tx?: string;
  error?: string;
}