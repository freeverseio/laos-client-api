"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const tokenUriMapper_1 = require("./tokenUriMapper");
const model_1 = require("../../model");
(0, globals_1.describe)('tokenUriMapper', () => {
    (0, globals_1.describe)('mapEventWithExternalURIToTokenUri', () => {
        (0, globals_1.it)('should map a RawEvent to a TokenUri with Pending state', () => {
            const rawEvent = {
                id: 'test-id',
                contract: 'test-contract',
                _tokenId: BigInt(1),
                _tokenURI: 'test-tokenURI',
                _to: 'test-to',
                timestamp: new Date(),
                blockNumber: 1,
                txHash: 'test-txHash',
                logIndex: 1,
            };
            const expectedTokenUri = new model_1.TokenUri({
                id: 'test-tokenURI',
                state: model_1.TokenUriFetchState.Pending,
            });
            (0, globals_1.expect)((0, tokenUriMapper_1.mapEventWithExternalURIToTokenUri)(rawEvent)).toEqual(expectedTokenUri);
        });
    });
    (0, globals_1.describe)('createTokenUriModels', () => {
        (0, globals_1.it)('should create an array of TokenUri models from an array of RawEvents', () => {
            const rawEvents = [
                {
                    id: 'test-id-1',
                    contract: 'test-contract',
                    _tokenId: BigInt(1),
                    _tokenURI: 'test-tokenURI-1',
                    _to: 'test-to-1',
                    timestamp: new Date(),
                    blockNumber: 1,
                    txHash: 'test-txHash-1',
                    logIndex: 1,
                },
                {
                    id: 'test-id-2',
                    contract: 'test-contract',
                    _tokenId: BigInt(2),
                    _tokenURI: 'test-tokenURI-2',
                    _to: 'test-to-2',
                    timestamp: new Date(),
                    blockNumber: 2,
                    txHash: 'test-txHash-2',
                    logIndex: 2,
                },
                {
                    id: 'test-id-3',
                    contract: 'test-contract',
                    _tokenId: BigInt(3),
                    _tokenURI: 'test-tokenURI-3',
                    _to: 'test-to-3',
                    timestamp: new Date(),
                    blockNumber: 3,
                    txHash: 'test-txHash-3',
                    logIndex: 3,
                },
            ];
            const expectedTokenUris = [
                new model_1.TokenUri({
                    id: 'test-tokenURI-1',
                    state: model_1.TokenUriFetchState.Pending,
                }),
                new model_1.TokenUri({
                    id: 'test-tokenURI-2',
                    state: model_1.TokenUriFetchState.Pending,
                }),
                new model_1.TokenUri({
                    id: 'test-tokenURI-3',
                    state: model_1.TokenUriFetchState.Pending,
                }),
            ];
            (0, globals_1.expect)((0, tokenUriMapper_1.createTokenUriModels)(rawEvents)).toEqual(expectedTokenUris);
        });
        (0, globals_1.it)('should remove duplicated TokenUri models based on id', () => {
            const rawEvents = [
                {
                    id: 'test-id-1',
                    contract: 'test-contract',
                    _tokenId: BigInt(1),
                    _tokenURI: 'test-tokenURI-1',
                    _to: 'test-to-1',
                    timestamp: new Date(),
                    blockNumber: 1,
                    txHash: 'test-txHash-1',
                    logIndex: 1,
                },
                {
                    id: 'test-id-2',
                    contract: 'test-contract',
                    _tokenId: BigInt(2),
                    _tokenURI: 'test-tokenURI-2',
                    _to: 'test-to-2',
                    timestamp: new Date(),
                    blockNumber: 2,
                    txHash: 'test-txHash-2',
                    logIndex: 2,
                },
                {
                    id: 'test-id-3',
                    contract: 'test-contract',
                    _tokenId: BigInt(3),
                    _tokenURI: 'test-tokenURI-1', // Duplicate
                    _to: 'test-to-3',
                    timestamp: new Date(),
                    blockNumber: 3,
                    txHash: 'test-txHash-3',
                    logIndex: 3,
                },
            ];
            const expectedTokenUris = [
                new model_1.TokenUri({
                    id: 'test-tokenURI-1',
                    state: model_1.TokenUriFetchState.Pending,
                }),
                new model_1.TokenUri({
                    id: 'test-tokenURI-2',
                    state: model_1.TokenUriFetchState.Pending,
                }),
            ];
            (0, globals_1.expect)((0, tokenUriMapper_1.createTokenUriModels)(rawEvents)).toEqual(expectedTokenUris);
        });
    });
});
//# sourceMappingURL=tokenUriMapper.test.js.map