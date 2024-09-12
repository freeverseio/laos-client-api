import Database from './Database';
import { IpfsUpload } from '../../types/ipfs';



class IpfsUploadService {

  public static async insertIpfsUpload({
    ipfsHash,
    status,
  }: {
    ipfsHash: string;
    status: string;
  }): Promise<IpfsUpload> {
    const res = await Database.query(
      'INSERT INTO api_ipfs_upload ( ipfs_hash, status) VALUES ($1, $2) RETURNING *',
      [ ipfsHash, status]
    );

    if (!res.rows[0]) {
      throw new Error('Failed to insert IPFS upload');
    }

    return res.rows[0];
  }

  public static async updateIpfsUpload(ipfsHash: string, status: string): Promise<IpfsUpload> {
    const res = await Database.query('UPDATE api_ipfs_upload SET status = $1 WHERE ipfs_hash = $2 RETURNING *', [status, ipfsHash]);
    return res.rows[0];
  }

  public static async deleteIpfsUpload(ipfsHash: string): Promise<void> {
    await Database.query('DELETE FROM api_ipfs_upload WHERE ipfs_hash = $1', [ipfsHash]);
  }

  public static async getIpfsUploadsByStatus(status: string): Promise<IpfsUpload[]> {
    const res = await Database.query('SELECT * FROM api_ipfs_upload WHERE status = $1', [status]);

    if (!res.rows.length) {
      throw new Error(`No IPFS uploads found with status: ${status}`);
    }

    return res.rows;
  }
}

export default IpfsUploadService;
