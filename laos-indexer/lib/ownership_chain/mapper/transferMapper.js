"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToTransfer = mapToTransfer;
exports.createTransferModels = createTransferModels;
const model_1 = require("../../model");
const util_1 = require("../util");
function mapToTransfer(raw) {
    return new model_1.Transfer({
        id: raw.id,
        asset: new model_1.Asset({ id: (0, util_1.generateAssetUUID)(raw.tokenId, raw.ownershipContract) }),
        from: raw.from,
        to: raw.to,
        timestamp: raw.timestamp,
        blockNumber: raw.blockNumber,
        txHash: raw.txHash,
    });
}
function createTransferModels(rawTransfers) {
    return rawTransfers.map(mapToTransfer);
}
//# sourceMappingURL=transferMapper.js.map