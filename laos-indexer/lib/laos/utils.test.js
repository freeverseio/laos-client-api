"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
describe('generateUUID', () => {
    it('should combine tokenId and contractAddress and generate a UUID', () => {
        const tokenId = 73650113464448320614314146005078575017174739311147380597791116992882814864680n;
        const contractAddress = '0xfec1af3e023432ef364ef88653094442cfc00020';
        expect((0, util_1.generateLaosAssetUUID)(tokenId, contractAddress)).toBe('aaaf738a-065d-56f5-8ee8-eb0ec7d2e215');
        expect((0, util_1.generateLaosAssetUUID)(tokenId, contractAddress)).toBe('aaaf738a-065d-56f5-8ee8-eb0ec7d2e215');
    });
});
//# sourceMappingURL=utils.test.js.map