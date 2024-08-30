import { getClientById } from './client';
import { query } from './connection';

// Mock the query function
jest.mock('./connection', () => ({
  query: jest.fn(),
}));

describe('getClientById', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a client when found', async () => {
    const mockClient = { 
      id: '1',
      name: 'Test Client',
      key: 'test-key',
      active: true
    };
    
    (query as jest.Mock).mockResolvedValue({ rows: [mockClient] });

    const result = await getClientById({clientId:'1'});

    expect(query).toHaveBeenCalledWith('SELECT * FROM client WHERE id = $1', ['1']);
    expect(result).toEqual(mockClient);
  });

  it('should return undefined when client is not found', async () => {
    (query as jest.Mock).mockResolvedValue({ rows: [] });

    const result = await getClientById({clientId:'999'});

    expect(query).toHaveBeenCalledWith('SELECT * FROM client WHERE id = $1', ['999']);
    expect(result).toBeUndefined();
  });

  it('should throw an error when the query fails', async () => {
    const errorMessage = 'Database error';
    (query as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getClientById({clientId:'1'})).rejects.toThrow(errorMessage);

    expect(query).toHaveBeenCalledWith('SELECT * FROM client WHERE id = $1', ['1']);
  });

  it('should handle non-string client IDs', async () => {
    const mockClient = { 
      id: 1,
      name: 'Test Client',
      key: 'test-key',
      active: true
    };
    
    (query as jest.Mock).mockResolvedValue({ rows: [mockClient] });

    const result = await getClientById({clientId:1 as unknown as string});

    expect(query).toHaveBeenCalledWith('SELECT * FROM client WHERE id = $1', [1]);
    expect(result).toEqual(mockClient);
  });
});