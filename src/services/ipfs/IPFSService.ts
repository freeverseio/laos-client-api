import PinataSDK from '@pinata/sdk';
import axios from 'axios';
import FormData from 'form-data';
import { AssetMetadata } from '../../types/asset';

export class IPFSService {
  private pinata: PinataSDK;
  private pinataApiKey: string;
  private pinataApiSecret: string;

  constructor(apiKey: string, apiSecret: string) {
    if (!apiKey || !apiSecret) {
      throw new Error('Pinata API key and secret are required');
    }
    this.pinataApiKey = apiKey;
    this.pinataApiSecret = apiSecret;
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

  public async uploadImageToIPFS(base64Image: string): Promise<string> {
    try {
      await this.pinata.testAuthentication();
      const buffer = Buffer.from(base64Image.split(',')[1], 'base64');
      const form = new FormData();
      form.append('file', buffer, {
        filename: 'image.png',
        contentType: 'image/png',
      });

      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      const response = await axios.post(url, form, {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`,
          'pinata_api_key': this.pinataApiKey,
          'pinata_secret_api_key': this.pinataApiSecret,
        },
      });

      return response.data.IpfsHash;
    } catch (error: any) {
      console.error('Image Upload Failed:', error.message);
      throw error;
    }
  }
}
