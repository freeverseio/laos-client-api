"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockEntityManager = void 0;
const TokenResolver_1 = require("./TokenResolver");
const model_1 = require("../../model");
const QueryBuilderService_1 = require("../service/QueryBuilderService");
const mockEntityManager = () => {
    return {
        getRepository: jest.fn().mockReturnThis(),
        count: jest.fn(),
        query: jest.fn(),
    };
};
exports.mockEntityManager = mockEntityManager;
describe('TokenResolver', () => {
    let resolver;
    let mockTx;
    let queryBuilderService;
    beforeEach(() => {
        const manager = (0, exports.mockEntityManager)();
        mockTx = jest.fn().mockResolvedValue(manager);
        resolver = new TokenResolver_1.TokenResolver(mockTx);
        queryBuilderService = new QueryBuilderService_1.QueryBuilderService();
        resolver['queryBuilderService'] = queryBuilderService;
    });
    it('should return NFT details by ID', async () => {
        const manager = await mockTx();
        const mockData = [
            {
                tokenId: 'token1',
                owner: 'owner1',
                tokenUri: 'uri1',
                createdAt: new Date('2021-01-01'),
            },
        ];
        manager.query.mockResolvedValue(mockData);
        const result = await resolver.token('contractId', 'token1');
        expect(result).toEqual(new model_1.TokenQueryResult({
            createdAt: new Date('2021-01-01'),
            tokenId: 'token1',
            owner: 'owner1',
            tokenUri: 'uri1',
        }));
    });
    it('should return null if no NFT details are found', async () => {
        const manager = await mockTx();
        manager.query.mockResolvedValue([]);
        const result = await resolver.token('contractId', 'token1');
        expect(result).toBeNull();
    });
    it('should return tokens by owner', async () => {
        const manager = await mockTx();
        const mockData = [
            {
                tokenId: 'token1',
                owner: 'owner1',
                tokenUri: 'uri1',
                createdAt: new Date('2021-01-01').getTime(), // Use numeric timestamp for createdAt
                logIndex: 0,
                contractAddress: '0xabc'
            },
        ];
        manager.query.mockResolvedValue(mockData);
        const result = await resolver.tokens({
            owner: 'owner1',
        }, {
            first: 10,
            after: Buffer.from('1609459200000:0:0xabc').toString('base64'), // Use base64 encoded timestamp and logIndex
        }, model_1.TokenOrderByOptions.CREATED_AT_ASC);
        expect(result).toEqual(new model_1.TokenConnection([new model_1.TokenEdge(Buffer.from(`${mockData[0].createdAt}:${mockData[0].logIndex}:${mockData[0].contractAddress}`).toString('base64'), new model_1.TokenQueryResult({
                ...mockData[0],
                createdAt: new Date(mockData[0].createdAt)
            }))], new model_1.PageInfo({
            endCursor: Buffer.from(`${mockData[0].createdAt}:${mockData[0].logIndex}:${mockData[0].contractAddress}`).toString('base64'),
            hasNextPage: false,
            hasPreviousPage: true,
            startCursor: Buffer.from(`${mockData[0].createdAt}:${mockData[0].logIndex}:${mockData[0].contractAddress}`).toString('base64')
        })));
    });
    it('should return tokens by collection', async () => {
        const manager = await mockTx();
        const mockData = [
            {
                tokenId: 'token1',
                owner: 'owner1',
                tokenUri: 'uri1',
                createdAt: new Date('2021-01-01').getTime(), // Use numeric timestamp for createdAt
                logIndex: 0,
                contractAddress: '0xabc'
            },
        ];
        manager.query.mockResolvedValue(mockData);
        const result = await resolver.tokens({
            contractAddress: 'collectionId',
        }, {
            first: 10,
            after: Buffer.from('1609459200000:0:0xabc').toString('base64'), // Use base64 encoded timestamp and logIndex
        }, model_1.TokenOrderByOptions.CREATED_AT_ASC);
        expect(result).toEqual(new model_1.TokenConnection([new model_1.TokenEdge(Buffer.from(`${mockData[0].createdAt}:${mockData[0].logIndex}:${mockData[0].contractAddress}`).toString('base64'), new model_1.TokenQueryResult({
                ...mockData[0],
                createdAt: new Date(mockData[0].createdAt)
            }))], new model_1.PageInfo({
            endCursor: Buffer.from(`${mockData[0].createdAt}:${mockData[0].logIndex}:${mockData[0].contractAddress}`).toString('base64'),
            hasNextPage: false,
            hasPreviousPage: true,
            startCursor: Buffer.from(`${mockData[0].createdAt}:${mockData[0].logIndex}:${mockData[0].contractAddress}`).toString('base64')
        })));
    });
    it('should return an empty array if no tokens are found', async () => {
        const manager = await mockTx();
        manager.query.mockResolvedValue([]);
        const result = await resolver.tokens({
            contractAddress: 'collectionId',
        }, {
            first: 10,
            after: Buffer.from('0:0:0xabc').toString('base64'), // Use base64 encoded timestamp and logIndex
        }, model_1.TokenOrderByOptions.CREATED_AT_ASC);
        expect(result).toEqual(new model_1.TokenConnection([], new model_1.PageInfo({
            endCursor: undefined,
            hasNextPage: false,
            hasPreviousPage: true,
            startCursor: undefined
        })));
        expect(manager.query).toHaveBeenCalledWith(expect.any(String), ['collectionid', "0", "0", '0xabc', 11]);
    });
});
//# sourceMappingURL=TokenResolver.test.js.map