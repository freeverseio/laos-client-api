import Database from './Database';
import { Contract, DbResult } from '../../types/contract';

class ContractService {
  private static transformDbResultToContract(dbResult: DbResult): Contract {
    return {
      id: dbResult.id.toString(),
      clientId: dbResult.client_id.toString(),
      chainId: dbResult.chain_id,
      contractAddress: dbResult.contract_address,
      laosContract: dbResult.laos_contract,
      batchMinterContract: dbResult.batch_minter_contract,
    };
  }

  public static async getClientContract(clientId: string, chainId: string, contract: string): Promise<Contract> {
    const res = await Database.query(
      'SELECT * FROM api_contract WHERE client_id = $1 AND chain_id = $2 AND contract_address = $3',
      [clientId, chainId, contract]
    );
    if (!res.rows[0]) {
      throw new Error('Contract not found');
    }
    return this.transformDbResultToContract(res.rows[0]);
  }

  public static async getClientContracts(clientId: string): Promise<Contract[]> {
    const res = await Database.query('SELECT * FROM api_contract WHERE client_id = $1', [clientId]);
    return res.rows.map(this.transformDbResultToContract);
  }

  public static async getContract(chainId: string, contract: string): Promise<Contract | null> {
    const res = await Database.query('SELECT * FROM api_contract WHERE chain_id = $1 AND contract_address = $2', [chainId, contract]);
    if (!res.rows[0]) {
      return null;
    }
    return this.transformDbResultToContract(res.rows[0]);
  }
}

export default ContractService;
