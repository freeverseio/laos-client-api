import { query } from './connection';

export async function getClientById({clientId}: {clientId: string}): Promise<Client | null> {
  const res = await query('SELECT * FROM api_client WHERE id = $1', [clientId]);
  return res.rows[0];
}

export async function getClientByKey({key}: {key: string}): Promise<Client> {
  const res = await query('SELECT * FROM api_client WHERE key = $1', [key]);
  if (!res.rows[0]) {
    throw new Error('Client not found');
  }
  if (!res.rows[0].active) {
    throw new Error('Client not active');
  }
  return res.rows[0];
}