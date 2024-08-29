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
exports.Contract = exports.functions = exports.events = void 0;
const p = __importStar(require("@subsquid/evm-codec"));
const evm_abi_1 = require("@subsquid/evm-abi");
exports.events = {
    EvolvedWithExternalURI: (0, evm_abi_1.event)("0xdde18ad2fe10c12a694de65b920c02b851c382cf63115967ea6f7098902fa1c8", "EvolvedWithExternalURI(uint256,string)", { "_tokenId": (0, evm_abi_1.indexed)(p.uint256), "_tokenURI": p.string }),
    MintedWithExternalURI: (0, evm_abi_1.event)("0xa7135052b348b0b4e9943bae82d8ef1c5ac225e594ef4271d12f0744cfc98348", "MintedWithExternalURI(address,uint96,uint256,string)", { "_to": (0, evm_abi_1.indexed)(p.address), "_slot": p.uint96, "_tokenId": p.uint256, "_tokenURI": p.string }),
    OwnershipTransferred: (0, evm_abi_1.event)("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", { "previousOwner": (0, evm_abi_1.indexed)(p.address), "newOwner": (0, evm_abi_1.indexed)(p.address) }),
    PublicMintingDisabled: (0, evm_abi_1.event)("0xebe230014056e5cb4ca6d8e534189bf5bfb0759489f16170654dce7c014b6699", "PublicMintingDisabled()", {}),
    PublicMintingEnabled: (0, evm_abi_1.event)("0x8ff3deee4c40ab085dd8d7d0c848cb5295e4ab5faa32e5b60e3936cf1bdc77bf", "PublicMintingEnabled()", {}),
};
exports.functions = {
    owner: (0, evm_abi_1.viewFun)("0x8da5cb5b", "owner()", {}, p.address),
    tokenURI: (0, evm_abi_1.viewFun)("0xc87b56dd", "tokenURI(uint256)", { "_tokenId": p.uint256 }, p.string),
    mintWithExternalURI: (0, evm_abi_1.fun)("0xfd024566", "mintWithExternalURI(address,uint96,string)", { "_to": p.address, "_slot": p.uint96, "_tokenURI": p.string }, p.uint256),
    evolveWithExternalURI: (0, evm_abi_1.fun)("0x2fd38f4d", "evolveWithExternalURI(uint256,string)", { "_tokenId": p.uint256, "_tokenURI": p.string }),
    transferOwnership: (0, evm_abi_1.fun)("0xf2fde38b", "transferOwnership(address)", { "newOwner": p.address }),
    enablePublicMinting: (0, evm_abi_1.fun)("0xf7beb98a", "enablePublicMinting()", {}),
    disablePublicMinting: (0, evm_abi_1.fun)("0x9190ad47", "disablePublicMinting()", {}),
    isPublicMintingEnabled: (0, evm_abi_1.viewFun)("0x441f06ac", "isPublicMintingEnabled()", {}, p.bool),
};
class Contract extends evm_abi_1.ContractBase {
    owner() {
        return this.eth_call(exports.functions.owner, {});
    }
    tokenURI(_tokenId) {
        return this.eth_call(exports.functions.tokenURI, { _tokenId });
    }
    isPublicMintingEnabled() {
        return this.eth_call(exports.functions.isPublicMintingEnabled, {});
    }
}
exports.Contract = Contract;
//# sourceMappingURL=EvolutionCollection.js.map