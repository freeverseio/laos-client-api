import { query } from './connection';

interface Contract {
  id: string;
  client_id: string;
  chain_id: string;
  contract_address: string;
  laos_contract: string;
  batch_minter_contract: string;
}

export async function getClientContract(clientId: string, chainId: string, contract: string): Promise<Contract | null> {
  const res = await query('SELECT * FROM contract WHERE client_id = $1 AND chain_id = $2 AND contract_address = $3', [clientId, chainId, contract]);
  return res.rows[0] || null;
}

export async function getClientContracts(clientId: string): Promise<Contract[]> {
  const res = await query('SELECT * FROM contract WHERE client_id = $1', [clientId]);
  return res.rows;
}
