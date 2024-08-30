"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpfsService = void 0;
const axios_1 = __importDefault(require("axios"));
const model_1 = require("../../model");
class IpfsService {
    ipfsUrlToHttpUrl(url) {
        if (!url)
            return '';
        if (url.startsWith('ipfs://')) {
            return url.replace('ipfs://', process.env.PRIVATE_IPFS_GATEWAY || 'ipfs://');
        }
        return url;
    }
    async fetchData(url) {
        try {
            const response = await axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            console.warn('Error fetching data from URL:', url, error);
            return null;
        }
    }
    async getDataFromIpfs(ipfsUrl) {
        const httpUrl = this.ipfsUrlToHttpUrl(ipfsUrl);
        let data;
        let fallback = false;
        try {
            data = await this.fetchData(httpUrl);
        }
        catch (error) {
            // fallback to different ipfs gateway
            fallback = true;
        }
        if (data === null || fallback) {
            if (ipfsUrl.startsWith('ipfs://')) {
                const httpUrlFallback = ipfsUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
                console.log('Falling back to ipfs.io:', httpUrlFallback);
                data = await this.fetchData(httpUrlFallback);
                console.log('Fetched data from ipfs.io done');
                return data;
            }
            else {
                return null;
            }
        }
        return data;
    }
    async getDataFromHttp(httpUrl) {
        return await this.fetchData(httpUrl);
    }
    mapAttributes(attributes) {
        if (attributes && Array.isArray(attributes)) {
            attributes = attributes.map((attr) => {
                if (attr.trait_type && attr.value) {
                    const attribute = new model_1.Attribute(undefined, { traitType: attr.trait_type, value: attr.value });
                    return attribute;
                }
                else {
                    console.warn('Invalid attribute format:', attr);
                    return null;
                }
            }).filter(attr => attr !== null);
        }
        return attributes;
    }
    async getTokenURIData(url) {
        let data;
        if (url.startsWith('ipfs://')) {
            data = await this.getDataFromIpfs(url);
        }
        else {
            data = await this.getDataFromHttp(url);
        }
        if (!data) {
            throw new Error('Failed to fetch token URI data');
        }
        let attributes;
        if (data.attributes) {
            try {
                attributes = this.mapAttributes(data.attributes);
            }
            catch (error) {
                console.warn('Error mapping attributes:', error);
            }
        }
        const tokenUri = new model_1.TokenUri({
            id: url,
            state: model_1.TokenUriFetchState.Done,
            name: data.name || null,
            description: data.description || null,
            image: data.image || null,
            attributes,
            fetched: new Date(),
        });
        return tokenUri;
    }
}
exports.IpfsService = IpfsService;
//# sourceMappingURL=IpfsService.js.map