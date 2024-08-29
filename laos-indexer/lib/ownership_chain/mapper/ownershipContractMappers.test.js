"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ownershipContractMapper_1 = require("./ownershipContractMapper");
const model_1 = require("../../model");
describe('mapToOwnershipContract', () => {
    it('should map RawOwnershipContract to OwnershipContract correctly', () => {
        const raw = {
            id: '0xfec1af3e023432ef364ef88653094442cfc00020',
            laosContract: '0xffffFfFFFFfFffFffffffFFe0000000000000354',
        };
        const expected = new model_1.OwnershipContract({
            id: '0xfec1af3e023432ef364ef88653094442cfc00020',
            laosContract: '0xffffFfFFFFfFffFffffffFFe0000000000000354',
            assets: [],
        });
        const result = (0, ownershipContractMapper_1.mapToOwnershipContract)(raw);
        expect(result).toEqual(expected);
    });
});
describe('createOwnershipContractsModel', () => {
    it('should map an array of RawOwnershipContract to an array of OwnershipContract correctly', () => {
        const rawOwnershipContracts = [
            {
                id: '0xfec1af3e023432ef364ef88653094442cfc00020',
                laosContract: '0xffffFfFFFFfFffFffffffFFe0000000000000354',
            },
            {
                id: '0xe3f5d',
                laosContract: '0xffffFfFFFFfFffFffffffFFe0000000000000355',
            },
        ];
        const expected = [
            new model_1.OwnershipContract({
                id: '0xfec1af3e023432ef364ef88653094442cfc00020',
                laosContract: '0xffffFfFFFFfFffFffffffFFe0000000000000354',
                assets: [],
            }),
            new model_1.OwnershipContract({
                id: '0xe3f5d',
                laosContract: '0xffffFfFFFFfFffFffffffFFe0000000000000355',
                assets: [],
            }),
        ];
        const result = (0, ownershipContractMapper_1.createOwnershipContractsModel)(rawOwnershipContracts);
        expect(result).toEqual(expected);
    });
});
//# sourceMappingURL=ownershipContractMappers.test.js.map