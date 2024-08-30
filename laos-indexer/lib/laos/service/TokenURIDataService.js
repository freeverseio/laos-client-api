"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenURIDataService = void 0;
const model_1 = require("../../model");
const IpfsService_1 = require("./IpfsService");
class TokenURIDataService {
    constructor(em) {
        this.isUpdating = false;
        this.updateQueue = null;
        this.entityManager = em;
        this.ipfsService = new IpfsService_1.IpfsService();
    }
    static getInstance(em) {
        if (!TokenURIDataService.instance) {
            TokenURIDataService.instance = new TokenURIDataService(em);
        }
        return TokenURIDataService.instance;
    }
    async updatePendingTokenUris() {
        if (this.isUpdating) {
            if (!this.updateQueue) {
                return new Promise((resolve) => {
                    this.updateQueue = () => {
                        this.updatePendingTokenUris().then(resolve);
                    };
                });
            }
            else {
                console.log('An update is already queued.');
                return Promise.resolve();
            }
        }
        this.isUpdating = true;
        try {
            const tokenUris = await this.entityManager.find(model_1.TokenUri, { where: { state: model_1.TokenUriFetchState.Pending } });
            const updatePromises = tokenUris.map(async (tokenUri) => {
                try {
                    const updatedTokenUri = await this.ipfsService.getTokenURIData(tokenUri.id);
                    if (updatedTokenUri) {
                        Object.assign(tokenUri, updatedTokenUri);
                        tokenUri.state = model_1.TokenUriFetchState.Done;
                    }
                    else {
                        console.error('Error updating token URI:', tokenUri.id);
                        tokenUri.state = model_1.TokenUriFetchState.Fail;
                    }
                }
                catch (error) {
                    console.error('Error updating token URI:', tokenUri.id, error);
                    tokenUri.state = model_1.TokenUriFetchState.Fail;
                }
                await this.entityManager.save(model_1.TokenUri, tokenUri);
            });
            await Promise.all(updatePromises);
        }
        finally {
            this.isUpdating = false;
            if (this.updateQueue) {
                const nextUpdate = this.updateQueue;
                this.updateQueue = null;
                nextUpdate();
            }
        }
    }
}
exports.TokenURIDataService = TokenURIDataService;
//# sourceMappingURL=TokenURIDataService.js.map