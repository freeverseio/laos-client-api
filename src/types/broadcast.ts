export interface BroadcastParams {
  tokenId: string;
}

export interface BroadcastResult {
  status: string;
  tokenId?: string;
  contractAddress?: string;
  tx?: string;
  error?: string;
}