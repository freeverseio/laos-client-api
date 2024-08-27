import fs from 'fs';
import path from 'path';



export class ApiKeyService {
  private rootDir = process.env.ROOT_DIR as string;
  private apiKeysFilePath = path.join(this.rootDir, 'config', 'apiKeys.json');
  private apiKeys: { apiKey: string; userId: number; contracts: { contractAddress: string; batchMinterContract: string }[] }[] = []; 

  constructor() {
    this.loadApiKeys();
  }

  private loadApiKeys() {
    const apiKeysData = JSON.parse(fs.readFileSync(this.apiKeysFilePath, 'utf-8'));
    this.apiKeys = apiKeysData.apiKeys;
  }

  public getBatchMinterContract(apiKey: string, contractAddress: string): string | null {
    const apiKeyEntry = this.apiKeys.find(key => key.apiKey === apiKey);
    if (!apiKeyEntry) {
      return null;
    }
    const contract = apiKeyEntry.contracts.find(contract => contract.contractAddress === contractAddress);
    return contract ? contract.batchMinterContract : null;
  }
}
