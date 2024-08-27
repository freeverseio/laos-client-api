import fs from 'fs';
import path from 'path';
import { ApiKeyService } from './ApiKeyService';

// Mock the `fs` module
jest.mock('fs');
jest.mock('path');

describe('ApiKeyService', () => {
  const mockApiKeysData = {
    apiKeys: [
      {
        apiKey: "test-1",
        userId: 1,
        contracts: [
          {
            contractAddress: "0xaaf54526c508d573d402bf05a9a5e54f09302adf",
            batchMinterContract: "0x7a263f4ef627f35850e478196b4c9ca33303d9e0"
          }
        ],
        createdAt: "2024-08-20T12:34:56Z"
      },
      {
        apiKey: "test-2",
        userId: 2,
        contracts: [
          {
            contractAddress: "0x21e999b6f9be90448b8de0578ef708018df90009",
            batchMinterContract: "0x7a263f4ef627f35850e478196b4c9ca33303d9e0"
          }
        ],
        createdAt: "2024-08-20T12:34:56Z"
      }
    ]
  };

  beforeEach(() => {
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockApiKeysData));
    
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load API keys from the JSON file on initialization', () => {
    const service = new ApiKeyService();

    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join(process.env.ROOT_DIR as string, 'config', 'apiKeys.json'),
      'utf-8'
    );

    expect(service['apiKeys']).toEqual(mockApiKeysData.apiKeys);
  });

  it('should return the correct batch minter contract when a valid API key and contract address are provided', () => {
    const service = new ApiKeyService();

    const batchMinterContract = service.getBatchMinterContract(
      'test-1',
      '0xaaf54526c508d573d402bf05a9a5e54f09302adf'
    );

    expect(batchMinterContract).toBe("0x7a263f4ef627f35850e478196b4c9ca33303d9e0");
  });

  it('should return null if the API key is not found', () => {
    const service = new ApiKeyService();

    const batchMinterContract = service.getBatchMinterContract(
      'invalid-api-key',
      '0xaaf54526c508d573d402bf05a9a5e54f09302adf'
    );

    expect(batchMinterContract).toBeNull();
  });

  it('should return null if the contract address is not found for the given API key', () => {
    const service = new ApiKeyService();

    const batchMinterContract = service.getBatchMinterContract(
      'test-1',
      'invalid-contract-address'
    );

    expect(batchMinterContract).toBeNull();
  });
});
