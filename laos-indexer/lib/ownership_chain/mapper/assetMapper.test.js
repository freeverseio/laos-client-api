"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assetMapper_1 = require("./assetMapper");
const model_1 = require("../../model");
const util_1 = require("../util");
jest.mock('../util', () => ({
    generateAssetUUID: jest.fn(),
}));
describe('mapToAsset', () => {
    it('should map RawTransfer to Asset correctly', () => {
        const raw = {
            id: '1',
            tokenId: BigInt(1),
            from: 'address1',
            to: 'address2',
            timestamp: new Date('2021-05-31T12:45:23Z'),
            blockNumber: 123456,
            txHash: 'txhash1',
            ownershipContract: 'contract1',
        };
        const mockedUUID = 'mockedUUID';
        util_1.generateAssetUUID.mockReturnValue(mockedUUID);
        const expected = new model_1.Asset({
            id: mockedUUID,
            ownershipContract: new model_1.OwnershipContract({ id: 'contract1' }),
            tokenId: BigInt(1),
            owner: 'address2',
            transfers: [],
        });
        const result = (0, assetMapper_1.mapToAsset)(raw);
        expect(result).toEqual(expected);
        expect(util_1.generateAssetUUID).toHaveBeenCalledWith(raw.tokenId, raw.ownershipContract);
    });
});
describe('createAssetModels', () => {
    it('should map an array of RawTransfer to an array of Asset correctly', () => {
        const rawTransfers = [
            {
                id: '1',
                tokenId: BigInt(1),
                from: 'address1',
                to: 'address2',
                timestamp: new Date('2021-05-31T12:45:23Z'),
                blockNumber: 123456,
                txHash: 'txhash1',
                ownershipContract: 'contract1',
            },
            {
                id: '2',
                tokenId: BigInt(2),
                from: 'address3',
                to: 'address4',
                timestamp: new Date('2021-05-31T12:46:24Z'),
                blockNumber: 123457,
                txHash: 'txhash2',
                ownershipContract: 'contract2',
            },
        ];
        const mockedUUID1 = 'mockedUUID1';
        const mockedUUID2 = 'mockedUUID2';
        util_1.generateAssetUUID
            .mockReturnValueOnce(mockedUUID1)
            .mockReturnValueOnce(mockedUUID2);
        const expected = [
            new model_1.Asset({
                id: mockedUUID1,
                ownershipContract: new model_1.OwnershipContract({ id: 'contract1' }),
                tokenId: BigInt(1),
                owner: 'address2',
                transfers: [],
            }),
            new model_1.Asset({
                id: mockedUUID2,
                ownershipContract: new model_1.OwnershipContract({ id: 'contract2' }),
                tokenId: BigInt(2),
                owner: 'address4',
                transfers: [],
            }),
        ];
        const result = (0, assetMapper_1.createAssetModels)(rawTransfers);
        expect(result).toEqual(expected);
        expect(util_1.generateAssetUUID).toHaveBeenCalledWith(rawTransfers[0].tokenId, rawTransfers[0].ownershipContract);
        expect(util_1.generateAssetUUID).toHaveBeenCalledWith(rawTransfers[1].tokenId, rawTransfers[1].ownershipContract);
    });
});
//# sourceMappingURL=assetMapper.test.js.map