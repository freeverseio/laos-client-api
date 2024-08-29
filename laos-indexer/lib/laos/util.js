"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLaosAssetUUID = generateLaosAssetUUID;
exports.generateLaosAssetMetadataUUID = generateLaosAssetMetadataUUID;
const crypto_1 = require("crypto");
const uuid_1 = require("uuid");
function generateLaosAssetUUID(tokenId, contractAddress) {
    const combinedString = tokenId + contractAddress;
    const hash = (0, crypto_1.createHash)('sha256').update(combinedString).digest('hex');
    // Use the hash as the name for a namespace-based UUID (UUID v5)
    const namespace = '80fa659c-305d-4a0a-a621-cbaf9f6847bd';
    const uuid = (0, uuid_1.v5)(hash, namespace);
    return uuid;
}
function generateLaosAssetMetadataUUID(tokenId, contractAddress) {
    const combinedString = tokenId + contractAddress;
    const hash = (0, crypto_1.createHash)('sha256').update(combinedString).digest('hex');
    const uuid = (0, uuid_1.v5)(hash, (0, uuid_1.v4)());
    return uuid;
}
//# sourceMappingURL=util.js.map