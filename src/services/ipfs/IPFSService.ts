import PinataSDK from '@pinata/sdk';
import { AssetMetadata } from '../../types/asset';

export class IPFSService {
  private pinata: PinataSDK;

  constructor(apiKey: string, apiSecret: string) {
    if (!apiKey || !apiSecret) {
      throw new Error('Pinata API key and secret are required');
    }
    this.pinata = new PinataSDK(apiKey, apiSecret);
  }

  public async uploadAssetMetadataToIPFS(assetJson: AssetMetadata, name: string | null): Promise<string> {
    try {
      await this.pinata.testAuthentication();
      const { IpfsHash } = await this.pinAssetMetadata(assetJson, name);
      return IpfsHash;
    } catch (error: any) {
      console.error('Upload Failed:', error.message);
      throw error;
    }
  }

  private async pinAssetMetadata(assetJson: AssetMetadata, name: string | null): Promise<{ IpfsHash: string }> {
    try {
      return await this.pinata.pinJSONToIPFS(assetJson, {
        pinataMetadata: {
          name: name || 'Untitled',
        },
      });
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await this.pinata.pinJSONToIPFS(assetJson, {
        pinataMetadata: {
          name: name || 'Untitled',
        },
      }).catch((error: Error) => {
        console.error('Upload Failed: ', error.message);
        return Promise.reject({ assetJson });
      });
    }
  }
}
