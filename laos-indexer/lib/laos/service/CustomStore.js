"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomStore = void 0;
const model_1 = require("../../model");
class CustomStore {
    constructor(em) {
        this.entityManager = em;
    }
    async evolve(entities) {
        for (const entity of entities) {
            const { id, ...attributes } = entity;
            await this.entityManager.update(model_1.LaosAsset, id, attributes);
        }
    }
}
exports.CustomStore = CustomStore;
//# sourceMappingURL=CustomStore.js.map