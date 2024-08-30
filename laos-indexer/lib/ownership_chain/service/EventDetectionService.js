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
const ERC721UniversalContract = __importStar(require("../../abi/UniversalContract"));
const util_1 = require("../util");
const uuid_1 = require("uuid");
class EventDetectionService {
    constructor(ctx, ownershipContractsToCheck) {
        this.ctx = ctx;
        this.ownershipContractsToCheck = ownershipContractsToCheck;
    }
    detectEvents() {
        const transfers = [];
        const ownershipContractsToInsertInDb = [];
        for (const block of this.ctx.blocks) {
            for (const log of block.logs) {
                this.detectNewERC721Universal(log, ownershipContractsToInsertInDb);
                this.detectTransfer(log, transfers, block.header.timestamp, block.header.height);
            }
        }
        return { transfers, ownershipContracts: ownershipContractsToInsertInDb };
    }
    detectNewERC721Universal(log, ownershipContractsToInsertInDb) {
        if (log.topics[0] === ERC721UniversalContract.events.NewERC721Universal.topic) {
            const logDecoded = ERC721UniversalContract.events.NewERC721Universal.decode(log);
            console.log('New ERC721 Universal contract detected:', logDecoded.newContractAddress);
            this.ownershipContractsToCheck.add(logDecoded.newContractAddress.toLowerCase());
            const baseURITokens = (0, util_1.parseBaseURI)(logDecoded.baseURI);
            if (baseURITokens === null)
                return; // If the baseURI is not valid, skip the ERC721Universal contract
            const laosContractAddress = baseURITokens?.accountKey20 ? baseURITokens.accountKey20.toLowerCase() : null;
            ownershipContractsToInsertInDb.push({
                id: logDecoded.newContractAddress.toLowerCase(),
                laosContract: laosContractAddress,
            });
        }
    }
    detectTransfer(log, transfers, timestamp, blockNumber) {
        if (this.ownershipContractsToCheck.has(log.address.toLowerCase()) && log.topics[0] === ERC721UniversalContract.events.Transfer.topic) {
            const logDecoded = ERC721UniversalContract.events.Transfer.decode(log);
            console.log('Transfer detected:', logDecoded);
            const { from, to, tokenId } = logDecoded;
            transfers.push({
                id: (0, uuid_1.v4)(),
                tokenId,
                from: from.toLowerCase(),
                to: to.toLowerCase(),
                timestamp: new Date(timestamp),
                blockNumber: blockNumber,
                txHash: log.transactionHash,
                ownershipContract: log.address.toLowerCase(),
            });
        }
    }
}
exports.EventDetectionService = EventDetectionService;
//# sourceMappingURL=EventDetectionService.js.map