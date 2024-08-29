"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const model_1 = require("../../model");
const IpfsService_1 = require("./IpfsService");
const TokenURIDataService_1 = require("./TokenURIDataService");
jest.mock('typeorm', () => {
    const actualTypeORM = jest.requireActual('typeorm');
    return {
        ...actualTypeORM,
        EntityManager: jest.fn().mockImplementation((connection) => ({
            find: jest.fn(),
            save: jest.fn(),
        })),
        Connection: jest.fn().mockImplementation(() => ({})),
    };
});
jest.mock('./IpfsService', () => ({
    IpfsService: jest.fn().mockImplementation(() => ({
        getTokenURIData: jest.fn(),
    })),
}));
describe('TokenURIDataService', () => {
    let entityManager;
    let ipfsService;
    let tokenURIDataService;
    beforeEach(() => {
        const connection = new (jest.requireMock('typeorm').Connection)();
        entityManager = new typeorm_1.EntityManager(connection);
        ipfsService = new IpfsService_1.IpfsService();
        tokenURIDataService = TokenURIDataService_1.TokenURIDataService.getInstance(entityManager);
        const consoleSpy = jest.spyOn(console, 'log');
        consoleSpy.mockImplementation(() => { });
        const consoleSpyError = jest.spyOn(console, 'error');
        consoleSpyError.mockImplementation(() => { });
    });
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        // Reset singleton instance for next test
        TokenURIDataService_1.TokenURIDataService.instance = null;
    });
    it('should create a singleton instance', () => {
        const instance1 = TokenURIDataService_1.TokenURIDataService.getInstance(entityManager);
        const instance2 = TokenURIDataService_1.TokenURIDataService.getInstance(entityManager);
        expect(instance1).toBe(instance2);
    });
    it('should not run updatePendingTokenUris if it is already running', async () => {
        entityManager.find.mockResolvedValue([]);
        ipfsService.getTokenURIData.mockResolvedValue({});
        // Simulate the function being in progress
        tokenURIDataService['isUpdating'] = true;
        tokenURIDataService['updateQueue'] = () => Promise.resolve();
        await tokenURIDataService.updatePendingTokenUris();
        expect(entityManager.find).not.toHaveBeenCalled();
    });
    it('should process the queued update after the current one finishes', async () => {
        const pendingTokenUris = [{ id: 1, state: model_1.TokenUriFetchState.Pending }];
        entityManager.find.mockResolvedValue(pendingTokenUris);
        ipfsService.getTokenURIData.mockResolvedValue({});
        // Simulate the function being in progress
        tokenURIDataService['isUpdating'] = true;
        const updatePromise1 = tokenURIDataService.updatePendingTokenUris();
        const updatePromise2 = tokenURIDataService.updatePendingTokenUris();
        expect(tokenURIDataService['updateQueue']).toBeDefined();
        // Simulate the function finishing
        tokenURIDataService['isUpdating'] = false;
        if (tokenURIDataService['updateQueue']) {
            tokenURIDataService['updateQueue']();
        }
        await updatePromise1;
        await updatePromise2;
        expect(entityManager.find).toHaveBeenCalledTimes(2);
    });
    it('should update pending token URIs', async () => {
        const pendingTokenUris = [
            { id: 1, state: model_1.TokenUriFetchState.Pending },
            { id: 2, state: model_1.TokenUriFetchState.Pending }
        ];
        entityManager.find.mockResolvedValue(pendingTokenUris);
        ipfsService.getTokenURIData.mockResolvedValue({});
        await tokenURIDataService.updatePendingTokenUris();
        expect(entityManager.find).toHaveBeenCalledWith(model_1.TokenUri, { where: { state: model_1.TokenUriFetchState.Pending } });
        expect(entityManager.save).toHaveBeenCalledTimes(pendingTokenUris.length);
    });
    it('should handle errors during token URI update', async () => {
        const pendingTokenUris = [
            { id: 1, state: model_1.TokenUriFetchState.Pending },
            { id: 2, state: model_1.TokenUriFetchState.Pending }
        ];
        entityManager.find.mockResolvedValue(pendingTokenUris);
        ipfsService.getTokenURIData.mockRejectedValue(new Error('IPFS Error'));
        await tokenURIDataService.updatePendingTokenUris();
        expect(entityManager.find).toHaveBeenCalledWith(model_1.TokenUri, { where: { state: model_1.TokenUriFetchState.Pending } });
        expect(entityManager.save).toHaveBeenCalledTimes(pendingTokenUris.length);
        expect(pendingTokenUris[0].state).toBe(model_1.TokenUriFetchState.Fail);
        expect(pendingTokenUris[1].state).toBe(model_1.TokenUriFetchState.Fail);
    });
});
//# sourceMappingURL=TokenURIDataService.test.js.map