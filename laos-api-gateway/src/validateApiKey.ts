import fs from 'fs';
import path from 'path';

const rootDir = process.env.ROOT_DIR as string;
const apiKeysFilePath = path.join(rootDir, 'config', 'apiKeys.json');

export default async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const apiKeysData = JSON.parse(fs.readFileSync(apiKeysFilePath, 'utf-8'));
    return apiKeysData.apiKeys.some((entry: { apiKey: string }) => entry.apiKey === apiKey);
  } catch (error) {
    console.error('Error reading API keys file:', error);
    return false;
  }
}