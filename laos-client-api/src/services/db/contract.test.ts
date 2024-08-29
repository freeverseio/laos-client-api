import { getClientContract, getClientContracts } from './contract';
import { query } from './connection';

// Mock the query function
jest.mock('./connection', () => ({
  query: jest.fn(),
}));

describe('Contract Service', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getClientContract', () => {
    it('should return a contract when found', async () => {
      const mockContract = {
        id: '1',
        client_id: 'client1',
        chain_id: 'chain1',
        contract_address: '0x123',
        laos_contract: 'true',
        batch_minter_contract: 'false'
      };
      
      (query as jest.Mock).mockResolvedValue({ rows: [mockContract] });

      const result = await getClientContract('client1', 'chain1', '0x123');

      expect(query).toHaveBeenCalledWith(
        'SELECT * FROM contract WHERE client_id = $1 AND chain_id = $2 AND contract_address = $3',
        ['client1', 'chain1', '0x123']
      );
      expect(result).toEqual(mockContract);
    });

    it('should return null when contract is not found', async () => {
      (query as jest.Mock).mockResolvedValue({ rows: [] });

      const result = await getClientContract('client1', 'chain1', '0x456');

      expect(query).toHaveBeenCalledWith(
        'SELECT * FROM contract WHERE client_id = $1 AND chain_id = $2 AND contract_address = $3',
        ['client1', 'chain1', '0x456']
      );
      expect(result).toBeNull();
    });

    it('should throw an error when the query fails', async () => {
      const errorMessage = 'Database error';
      (query as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(getClientContract('client1', 'chain1', '0x123')).rejects.toThrow(errorMessage);

      expect(query).toHaveBeenCalledWith(
        'SELECT * FROM contract WHERE client_id = $1 AND chain_id = $2 AND contract_address = $3',
        ['client1', 'chain1', '0x123']
      );
    });
  });

  describe('getClientContracts', () => {
    it('should return an array of contracts when found', async () => {
      const mockContracts = [
        {
          id: '1',
          client_id: 'client1',
          chain_id: 'chain1',
          contract_address: '0x123',
          laos_contract: 'true',
          batch_minter_contract: 'false'
        },
        {
          id: '2',
          client_id: 'client1',
          chain_id: 'chain2',
          contract_address: '0x456',
          laos_contract: 'false',
          batch_minter_contract: 'true'
        }
      ];
      
      (query as jest.Mock).mockResolvedValue({ rows: mockContracts });

      const result = await getClientContracts('client1');

      expect(query).toHaveBeenCalledWith('SELECT * FROM contract WHERE client_id = $1', ['client1']);
      expect(result).toEqual(mockContracts);
    });

    it('should return an empty array when no contracts are found', async () => {
      (query as jest.Mock).mockResolvedValue({ rows: [] });

      const result = await getClientContracts('client2');

      expect(query).toHaveBeenCalledWith('SELECT * FROM contract WHERE client_id = $1', ['client2']);
      expect(result).toEqual([]);
    });

    it('should throw an error when the query fails', async () => {
      const errorMessage = 'Database error';
      (query as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(getClientContracts('client1')).rejects.toThrow(errorMessage);

      expect(query).toHaveBeenCalledWith('SELECT * FROM contract WHERE client_id = $1', ['client1']);
    });
  });
});