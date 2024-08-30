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
exports.processor = void 0;
const evm_processor_1 = require("@subsquid/evm-processor");
const ERC721UniversalContract = __importStar(require("../abi/UniversalContract"));
exports.processor = new evm_processor_1.EvmBatchProcessor()
    .setGateway(process.env.GATEWAY_ENDPOINT)
    .setDataSource({
    chain: process.env.RPC_ENDPOINT,
})
    .setFinalityConfirmation(200)
    .setBlockRange({
    from: Number(process.env.STARTING_BLOCK_OWNERSHIP),
})
    .addLog({
    topic0: [ERC721UniversalContract.events.NewERC721Universal.topic, ERC721UniversalContract.events.Transfer.topic]
})
    .setFields({
    log: {
        transactionHash: true
    }
});
//# sourceMappingURL=processor.js.map