import { Contract, DbResult } from '../../types/contract';
import { query } from './connection';

function transformDbResultToContract(dbResult: DbResult): Contract {
  return {
    id: dbResult.id.toString(),
    clientId: dbResult.client_id.toString(),
    chainId: dbResult.chain_id,
    contractAddress: dbResult.contract_address,
    laosContract: dbResult.laos_contract,
    batchMinterContract: dbResult.batch_minter_contract
  };
}

export async function getClientContract({clientId, chainId, contract}: {clientId: string, chainId: string, contract: string}): Promise<Contract> {
  const res = await query('SELECT * FROM api_contract WHERE client_id = $1 AND chain_id = $2 AND contract_address = $3', [clientId, chainId, contract]);
  if (!res || !res.rows || !res.rows[0]) {
    throw new Error('Contract not found');
  }  
  const contractData: Contract = transformDbResultToContract(res.rows[0]);
  return contractData;
}

export async function getClientContracts({clientId}: {clientId: string}): Promise<Contract[]> {
  const res = await query('SELECT * FROM api_contract WHERE client_id = $1', [clientId]);
  return res.rows.map(transformDbResultToContract);
}

export async function getContract({chainId, contract}: {chainId: string, contract: string}): Promise<Contract | null> {
  const res = await query('SELECT * FROM api_contract WHERE chain_id = $1 AND contract_address = $2', [chainId, contract]);
  if (res.rows.length === 0) {
    return null;
  }
  const contractData: Contract = transformDbResultToContract(res.rows[0]);
  return contractData;
}
