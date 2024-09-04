import { query } from './connection';
import { Client } from '../../types/client';

export async function getClientById({clientId}: {clientId: string}): Promise<Client | null> {
  const res = await query('SELECT * FROM api_client WHERE id = $1', [clientId]);
  return res.rows[0];
}

export async function getClientByKey({key}: {key: string}): Promise<Client> {
  let res;
  try {
    res = await query('SELECT * FROM api_client WHERE key = $1', [key]);
    if (!res.rows[0]) {
      throw new Error('Invalid API key');
    }
    if (!res.rows[0].active) {
      throw new Error('Client deactivated');
    }
  } catch (error) {
    console.error('getClientByKey error:', error);
    throw error;
  }
  return res.rows[0];
}