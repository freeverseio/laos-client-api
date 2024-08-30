"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_store_1 = require("@subsquid/typeorm-store");
const processor_1 = require("./processor");
const model_1 = require("../model");
const EventDetectionService_1 = require("./service/EventDetectionService");
const ownershipContractMapper_1 = require("./mapper/ownershipContractMapper");
const transferMapper_1 = require("./mapper/transferMapper");
const assetMapper_1 = require("./mapper/assetMapper");
const options = {
    supportHotBlocks: true,
    stateSchema: 'ownership_chain_processor',
};
processor_1.processor.run(new typeorm_store_1.TypeormDatabase(options), async (ctx) => {
    const ownerShipContracts = await ctx.store.find(model_1.OwnershipContract);
    const ownershipContractIds = new Set(ownerShipContracts.map(contract => contract.id));
    const service = new EventDetectionService_1.EventDetectionService(ctx, ownershipContractIds);
    const detectedEvents = service.detectEvents();
    const rawOwnershipContracts = detectedEvents.ownershipContracts;
    const rawTransfers = detectedEvents.transfers;
    if (rawOwnershipContracts.length > 0) {
        const ownershipContractsModelArray = (0, ownershipContractMapper_1.createOwnershipContractsModel)(detectedEvents.ownershipContracts);
        await ctx.store.insert(ownershipContractsModelArray);
    }
    if (rawTransfers.length > 0) {
        const assetsModels = (0, assetMapper_1.createAssetModels)(rawTransfers);
        for (const assetModel of assetsModels) {
            await ctx.store.upsert(assetModel);
        }
        const transfersModelArray = (0, transferMapper_1.createTransferModels)(rawTransfers);
        await ctx.store.insert(transfersModelArray);
    }
});
//# sourceMappingURL=main.js.map