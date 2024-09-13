import Database from './Database';
import { Client } from '../../types/client';

class ClientService {
  public static async getClientById(clientId: string): Promise<Client | null> {
    const res = await Database.query('SELECT * FROM api_client WHERE id = $1', [clientId]);
    return res.rows[0] || null;
  }

  public static async getClientByKey(key: string): Promise<Client> {
    const res = await Database.query('SELECT * FROM api_client WHERE key = $1', [key]);

    if (!res.rows[0]) {
      throw new Error('Invalid API key');
    }

    if (!res.rows[0].active) {
      throw new Error('Client deactivated');
    }

    return res.rows[0];
  }
}

export default ClientService;
