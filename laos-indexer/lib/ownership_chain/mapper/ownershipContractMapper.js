"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToOwnershipContract = mapToOwnershipContract;
exports.createOwnershipContractsModel = createOwnershipContractsModel;
const model_1 = require("../../model");
function mapToOwnershipContract(raw) {
    return new model_1.OwnershipContract({
        id: raw.id,
        laosContract: raw.laosContract,
        assets: [],
    });
}
function createOwnershipContractsModel(rawOwnershipContracts) {
    return rawOwnershipContracts.map(mapToOwnershipContract);
}
//# sourceMappingURL=ownershipContractMapper.js.map