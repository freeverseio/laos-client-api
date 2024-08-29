import { query } from './connection';

export async function getClientById(clientId: string) {
  const res = await query('SELECT * FROM client WHERE id = $1', [clientId]);
  return res.rows[0];
}
