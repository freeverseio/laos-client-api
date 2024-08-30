"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToAsset = mapToAsset;
exports.createAssetModels = createAssetModels;
const model_1 = require("../../model");
const util_1 = require("../util");
function mapToAsset(raw) {
    const asset = new model_1.Asset({
        id: (0, util_1.generateAssetUUID)(raw.tokenId, raw.ownershipContract),
        ownershipContract: new model_1.OwnershipContract({ id: raw.ownershipContract }),
        tokenId: raw.tokenId,
        owner: raw.to,
        transfers: [],
    });
    return asset;
}
function createAssetModels(rawTransfers) {
    return rawTransfers.map(mapToAsset);
}
//# sourceMappingURL=assetMapper.js.map