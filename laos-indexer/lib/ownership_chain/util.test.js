"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
describe('generateUUID', () => {
    it('should combine tokenId and contractAddress and generate a UUID', () => {
        const tokenId = 73650113464448320614314146005078575017174739311147380597791116992882814864680n;
        const contractAddress = '0xfec1af3e023432ef364ef88653094442cfc00020';
        expect((0, util_1.generateAssetUUID)(tokenId, contractAddress)).toBe('eb86bf56-9060-5369-8314-447743cfb20b');
        expect((0, util_1.generateAssetUUID)(tokenId, contractAddress)).toBe('eb86bf56-9060-5369-8314-447743cfb20b');
    });
    it('should combine tokenId and contractAddress and generate a UUID', () => {
        const tokenId = 860693765837880643717743864570872188823830693415160471676824633488737684776n;
        const contractAddress = '0xfec1af3e023432ef364ef88653094442cfc00020';
        expect((0, util_1.generateAssetUUID)(tokenId, contractAddress)).toBe('5258bdfa-3b2e-58c7-a686-17d1e8406586');
        expect((0, util_1.generateAssetUUID)(tokenId, contractAddress)).toBe('5258bdfa-3b2e-58c7-a686-17d1e8406586');
    });
});
//# sourceMappingURL=util.test.js.map