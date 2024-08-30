import { query } from './connection';

interface Contract {
  id: string;
  client_id: string;
  chain_id: string;
  contract_address: string;
  laos_contract: string;
  batch_minter_contract: string;
}

export async function getClientContract({clientId, chainId, contract}: {clientId: string, chainId: string, contract: string}): Promise<Contract | null> {
  const res = await query('SELECT * FROM api_contract WHERE client_id = $1 AND chain_id = $2 AND contract_address = $3', [clientId, chainId, contract]);
  return res.rows[0] || null;
}

export async function getClientContracts({clientId}: {clientId: string}): Promise<Contract[]> {
  const res = await query('SELECT * FROM api_contract WHERE client_id = $1', [clientId]);
  return res.rows;
}

export async function getContract({chainId, contract}: {chainId: string, contract: string}): Promise<Contract | null> {
  const res = await query('SELECT * FROM api_contract WHERE chain_id = $1 AND contract_address = $2', [chainId, contract]);
  return res.rows[0] || null;
}
