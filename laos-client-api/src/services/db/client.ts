import { query } from './connection';

interface Client {
  id: string;
  name: string;
  key: string;
  active: boolean;  
}

export async function getClientById({clientId}: {clientId: string}): Promise<Client | null> {
  const res = await query('SELECT * FROM api_client WHERE id = $1', [clientId]);
  return res.rows[0];
}

export async function getClientByKey({key}: {key: string}): Promise<Client | null> {
  const res = await query('SELECT * FROM api_client WHERE key = $1', [key]);
  return res.rows[0];
}