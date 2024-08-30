"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_store_1 = require("@subsquid/typeorm-store");
const processor_1 = require("./processor");
const EventDetectionService_1 = require("./service/EventDetectionService");
const CustomStore_1 = require("./service/CustomStore");
const mintMapper_1 = require("./mapper/mintMapper");
const tokenUriMapper_1 = require("./mapper/tokenUriMapper");
const evolveMapper_1 = require("./mapper/evolveMapper");
const tokenUriProcessor_1 = require("./tokenUriProcessor");
const options = {
    supportHotBlocks: true,
    stateSchema: 'laos_processor',
};
processor_1.processor.run(new typeorm_store_1.TypeormDatabase(options), async (ctx) => {
    const service = new EventDetectionService_1.EventDetectionService(ctx);
    const detectedEvents = service.detectEvents();
    const mintEvents = detectedEvents.mintEvents;
    const evolveEvents = detectedEvents.evolveEvents;
    let processTokenUris = false;
    if (mintEvents.length > 0) {
        processTokenUris = true;
        const mints = (0, mintMapper_1.createMintedWithExternalURIModels)(mintEvents);
        const tokenUris = (0, tokenUriMapper_1.createTokenUriModels)(mintEvents);
        await ctx.store.upsert(tokenUris);
        await ctx.store.upsert(mints.map(mint => mint.asset));
        await ctx.store.insert(mints.map(mint => mint.metadata));
    }
    if (evolveEvents.length > 0) {
        processTokenUris = true;
        const evolves = (0, evolveMapper_1.createEvolveModels)(evolveEvents);
        const tokenUris = (0, tokenUriMapper_1.createTokenUriModels)(evolveEvents);
        await ctx.store.upsert(tokenUris);
        const customStore = new CustomStore_1.CustomStore(ctx.store['em']());
        await customStore.evolve(evolves.map(evolve => evolve.asset));
        await ctx.store.insert(evolves.map(evolve => evolve.metadata));
    }
    if (processTokenUris) {
        (0, tokenUriProcessor_1.processTokenURIs)();
    }
});
//# sourceMappingURL=main.js.map