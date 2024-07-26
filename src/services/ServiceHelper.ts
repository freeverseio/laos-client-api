import { IPFSService } from "./ipfs/IPFSService";
import { LaosService } from "./blockchain/LaosService";
import { MintConfig, AssetAttributes } from "../types";

export class ServiceHelper {
  public ipfsService: IPFSService;
  public laosService: LaosService;

  constructor(config: MintConfig) {
    const pinataApiKey = process.env.PINATA_API_KEY || '';
    const pinataApiSecret = process.env.PINATA_API_SECRET || '';

    if (!pinataApiKey || !pinataApiSecret) {
      throw new Error('Pinata API key and secret are required');
    }

    this.ipfsService = new IPFSService(pinataApiKey, pinataApiSecret);
    this.laosService = new LaosService(config, this.ipfsService);
  }

  public parseAssetAttributes(jsonString: string): AssetAttributes[] {
    // if empty string, return empty array
    if (jsonString === '') {
      return [];
    }

    try {
      const parsedArray = JSON.parse(jsonString);
      if (!Array.isArray(parsedArray)) {
        throw new Error('JSON is not an array');
      }

      parsedArray.forEach((item, index) => {
        if (
          typeof item.trait_type !== 'string' ||
          typeof item.value !== 'string'
        ) {
          throw new Error(`Invalid JSON structure at index ${index}`);
        }
      });

      return parsedArray as AssetAttributes[];
    } catch (error) {
      throw new Error(`Failed to parse JSON string: ${error}`);
    }
  }
}
