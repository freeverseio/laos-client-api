"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventDetectionService_1 = require("./EventDetectionService");
const Context_1 = require("../../__mocks__/Context");
const mockdata_1 = require("../../__mocks__/mockdata");
describe('EventDetectionService', () => {
    let ctx;
    beforeEach(() => {
        const consoleSpy = jest.spyOn(console, 'log');
        consoleSpy.mockImplementation(() => { });
    });
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });
    it('should detect 2 new MintedWithExternalURI events', () => {
        ctx = new Context_1.Context(mockdata_1.mockLogsMintedEvents);
        const service = new EventDetectionService_1.EventDetectionService(ctx);
        const detectedEvents = service.detectEvents();
        expect(detectedEvents.mintEvents).toHaveLength(2);
        expect(detectedEvents.mintEvents[0]._tokenURI).toEqual('ipfs://QmWwCP24PSGwLRvN2R7S24DHSqVyN8sEZptwN8EugxKxrQ');
        expect(detectedEvents.mintEvents[1]._tokenURI).toEqual('ipfs://QmYXPg1NkPD2rMDi3oHQWsR5kfoZg8FQLNLmW75brHKTqV');
    });
    it('should detect 1 new Evolved event', () => {
        ctx = new Context_1.Context(mockdata_1.mockLogsEvolvedEvents);
        const service = new EventDetectionService_1.EventDetectionService(ctx);
        const detectedEvents = service.detectEvents();
        expect(detectedEvents.evolveEvents).toHaveLength(1);
        expect(detectedEvents.evolveEvents[0]._tokenURI).toEqual('ipfs://Qma44RcEvemhECberDeKfa3u84MzMDf3u15H8RE1ZxwvrW');
    });
});
//# sourceMappingURL=EventDetectionService.test.js.map