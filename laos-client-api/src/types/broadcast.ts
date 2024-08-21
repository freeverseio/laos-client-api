export interface BroadcastParams {
  tokenId: string;
  chainId: string;
  ownershipContractAddress: string;
}

export interface BroadcastResult {
  status: string;
  tokenId?: string;
  contractAddress?: string;
  tx?: string;
  error?: string;
}