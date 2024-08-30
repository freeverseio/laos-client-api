"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEvolveEvent = mapEvolveEvent;
exports.createEvolveModels = createEvolveModels;
const model_1 = require("../../model");
const util_1 = require("../util");
const metadataMapper_1 = require("./metadataMapper");
function mapEvolveEvent(raw) {
    const metadata = (0, metadataMapper_1.mapEvolvedWithExternalURItoMetadata)(raw);
    const asset = new model_1.LaosAsset({
        id: (0, util_1.generateLaosAssetUUID)(raw._tokenId, raw.contract),
        tokenId: raw._tokenId,
        laosContract: raw.contract,
        metadata: metadata.id,
    });
    console.log('Mapped evolve event:', asset);
    return { metadata, asset };
}
function createEvolveModels(rawEvolveEvents) {
    return rawEvolveEvents.map((raw) => mapEvolveEvent(raw));
}
//# sourceMappingURL=evolveMapper.js.map