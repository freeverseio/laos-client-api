"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapMintedWithExternalURItoMetadata = mapMintedWithExternalURItoMetadata;
exports.mapEvolvedWithExternalURItoMetadata = mapEvolvedWithExternalURItoMetadata;
exports.createMetadataModels = createMetadataModels;
const model_1 = require("../../model");
const util_1 = require("../util");
function mapMintedWithExternalURItoMetadata(raw) {
    const metadata = new model_1.Metadata({
        id: (0, util_1.generateLaosAssetMetadataUUID)(raw._tokenId, raw.contract),
        tokenUri: new model_1.TokenUri({ id: raw._tokenURI, state: model_1.TokenUriFetchState.Pending }),
        blockNumber: raw.blockNumber,
        timestamp: raw.timestamp,
        txHash: raw.txHash,
        laosAsset: new model_1.LaosAsset({
            id: (0, util_1.generateLaosAssetUUID)(raw._tokenId, raw.contract),
            tokenId: raw._tokenId,
            initialOwner: raw._to,
            logIndex: raw.logIndex,
            laosContract: raw.contract,
        }),
    });
    return metadata;
}
function mapEvolvedWithExternalURItoMetadata(raw) {
    const metadata = new model_1.Metadata({
        id: (0, util_1.generateLaosAssetMetadataUUID)(raw._tokenId, raw.contract),
        tokenUri: new model_1.TokenUri({ id: raw._tokenURI, state: model_1.TokenUriFetchState.Pending }),
        blockNumber: raw.blockNumber,
        timestamp: raw.timestamp,
        txHash: raw.txHash,
        laosAsset: new model_1.LaosAsset({
            id: (0, util_1.generateLaosAssetUUID)(raw._tokenId, raw.contract),
            tokenId: raw._tokenId,
            laosContract: raw.contract,
        }),
    });
    return metadata;
}
function createMetadataModels(rawMintedWithExternalURI) {
    return rawMintedWithExternalURI.map((raw) => mapMintedWithExternalURItoMetadata(raw));
}
//# sourceMappingURL=metadataMapper.js.map