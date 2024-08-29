"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapMintedWithExternalURI = mapMintedWithExternalURI;
exports.createMintedWithExternalURIModels = createMintedWithExternalURIModels;
const model_1 = require("../../model");
const util_1 = require("../util");
const metadataMapper_1 = require("./metadataMapper");
function mapMintedWithExternalURI(raw) {
    const metadata = (0, metadataMapper_1.mapMintedWithExternalURItoMetadata)(raw);
    const asset = new model_1.LaosAsset({
        id: (0, util_1.generateLaosAssetUUID)(raw._tokenId, raw.contract),
        tokenId: raw._tokenId,
        initialOwner: raw._to,
        laosContract: raw.contract,
        createdAt: raw.timestamp,
        logIndex: raw.logIndex,
        metadata: metadata.id,
    });
    console.log('Mapped minted with external URI:', asset);
    return { metadata, asset };
}
function createMintedWithExternalURIModels(rawMintedWithExternalURI) {
    return rawMintedWithExternalURI.map((raw) => mapMintedWithExternalURI(raw));
}
//# sourceMappingURL=mintMapper.js.map