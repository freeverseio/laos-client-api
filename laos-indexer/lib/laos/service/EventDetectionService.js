"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDetectionService = void 0;
const EvolutionCollection = __importStar(require("../../abi/EvolutionCollection"));
class EventDetectionService {
    constructor(ctx) {
        this.ctx = ctx;
    }
    detectEvents() {
        const mintEvents = [];
        let evolveEvents = [];
        for (const block of this.ctx.blocks) {
            for (const log of block.logs) {
                this.detectMintedWithExternalURI(log, mintEvents, block.header.timestamp, block.header.height);
                this.detectEvolvedWithExternalURI(log, evolveEvents, block.header.timestamp, block.header.height);
            }
        }
        return {
            mintEvents,
            evolveEvents
        };
    }
    detectMintedWithExternalURI(log, mintedEvents, timestamp, blockNumber) {
        if (log.topics[0] === EvolutionCollection.events.MintedWithExternalURI.topic) {
            const logDecoded = EvolutionCollection.events.MintedWithExternalURI.decode(log);
            console.log('MintedWithExternalURI detected:', logDecoded);
            const { _to, _slot, _tokenId, _tokenURI } = logDecoded;
            mintedEvents.push({
                id: log.id,
                contract: log.address.toLowerCase(),
                _to: _to.toLowerCase(),
                _slot,
                _tokenId,
                _tokenURI,
                timestamp: new Date(timestamp),
                blockNumber: blockNumber,
                txHash: log.transactionHash,
                logIndex: log.logIndex,
            });
        }
    }
    detectEvolvedWithExternalURI(log, evolvedEvents, timestamp, blockNumber) {
        if (log.topics[0] === EvolutionCollection.events.EvolvedWithExternalURI.topic) {
            const logDecoded = EvolutionCollection.events.EvolvedWithExternalURI.decode(log);
            console.log('EvolvedWithExternalURI detected:', logDecoded);
            const { _tokenId, _tokenURI } = logDecoded;
            evolvedEvents.push({
                id: log.id,
                contract: log.address.toLowerCase(),
                _tokenId,
                _tokenURI,
                timestamp: new Date(timestamp),
                blockNumber: blockNumber,
                txHash: log.transactionHash,
                logIndex: log.logIndex,
            });
        }
    }
}
exports.EventDetectionService = EventDetectionService;
//# sourceMappingURL=EventDetectionService.js.map