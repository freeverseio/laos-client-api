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
    Approval: (0, evm_abi_1.event)("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", "Approval(address,address,uint256)", { "owner": (0, evm_abi_1.indexed)(p.address), "approved": (0, evm_abi_1.indexed)(p.address), "tokenId": (0, evm_abi_1.indexed)(p.uint256) }),
    ApprovalForAll: (0, evm_abi_1.event)("0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31", "ApprovalForAll(address,address,bool)", { "owner": (0, evm_abi_1.indexed)(p.address), "operator": (0, evm_abi_1.indexed)(p.address), "approved": p.bool }),
    LockedBaseURI: (0, evm_abi_1.event)("0x0bca4aaa33018fc07dbe996053fc5b1f6ed8fbcce1261967821bcd7d4e95cd8c", "LockedBaseURI(string)", { "baseURI": p.string }),
    NewERC721Universal: (0, evm_abi_1.event)("0x74b81bc88402765a52dad72d3d893684f472a679558f3641500e0ee14924a10a", "NewERC721Universal(address,string)", { "newContractAddress": p.address, "baseURI": p.string }),
    OwnershipTransferred: (0, evm_abi_1.event)("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", { "previousOwner": (0, evm_abi_1.indexed)(p.address), "newOwner": (0, evm_abi_1.indexed)(p.address) }),
    Transfer: (0, evm_abi_1.event)("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "Transfer(address,address,uint256)", { "from": (0, evm_abi_1.indexed)(p.address), "to": (0, evm_abi_1.indexed)(p.address), "tokenId": (0, evm_abi_1.indexed)(p.uint256) }),
    UpdatedBaseURI: (0, evm_abi_1.event)("0xe12d4d4a70d9b5c313db41dbfde977d2932dd59c55fca4a4af5181b2397c1725", "UpdatedBaseURI(string)", { "newBaseURI": p.string }),
    UpdatedTokenIdAffixes: (0, evm_abi_1.event)("0x59de06b481abf362e010062c9251b68540649936c6b42c718d25ec2e895cbef3", "UpdatedTokenIdAffixes(string,string)", { "newPrefix": p.string, "newSuffix": p.string }),
};
exports.functions = {
    ERC721UniversalVersion: (0, evm_abi_1.viewFun)("0xf43199aa", "ERC721UniversalVersion()", {}, p.uint32),
    approve: (0, evm_abi_1.fun)("0x095ea7b3", "approve(address,uint256)", { "to": p.address, "tokenId": p.uint256 }),
    balanceOf: (0, evm_abi_1.viewFun)("0x70a08231", "balanceOf(address)", { "_owner": p.address }, p.uint256),
    baseURI: (0, evm_abi_1.viewFun)("0x6c0360eb", "baseURI()", {}, p.string),
    broadcastMint: (0, evm_abi_1.fun)("0x46d2d496", "broadcastMint(uint256)", { "tokenId": p.uint256 }),
    broadcastMintBatch: (0, evm_abi_1.fun)("0x227a3579", "broadcastMintBatch(uint256[])", { "tokenIds": p.array(p.uint256) }),
    broadcastSelfTransfer: (0, evm_abi_1.fun)("0x065ab9a3", "broadcastSelfTransfer(uint256)", { "tokenId": p.uint256 }),
    broadcastSelfTransferBatch: (0, evm_abi_1.fun)("0x39c9b305", "broadcastSelfTransferBatch(uint256[])", { "tokenIds": p.array(p.uint256) }),
    burn: (0, evm_abi_1.fun)("0x42966c68", "burn(uint256)", { "tokenId": p.uint256 }),
    getApproved: (0, evm_abi_1.viewFun)("0x081812fc", "getApproved(uint256)", { "tokenId": p.uint256 }, p.address),
    initOwner: (0, evm_abi_1.viewFun)("0x57854508", "initOwner(uint256)", { "tokenId": p.uint256 }, p.address),
    isApprovedForAll: (0, evm_abi_1.viewFun)("0xe985e9c5", "isApprovedForAll(address,address)", { "owner": p.address, "operator": p.address }, p.bool),
    isBaseURILocked: (0, evm_abi_1.viewFun)("0x78f1fefc", "isBaseURILocked()", {}, p.bool),
    isBurned: (0, evm_abi_1.viewFun)("0xdb44fe07", "isBurned(uint256)", { "tokenId": p.uint256 }, p.bool),
    lockBaseURI: (0, evm_abi_1.fun)("0x53df5c7c", "lockBaseURI()", {}),
    name: (0, evm_abi_1.viewFun)("0x06fdde03", "name()", {}, p.string),
    owner: (0, evm_abi_1.viewFun)("0x8da5cb5b", "owner()", {}, p.address),
    ownerOf: (0, evm_abi_1.viewFun)("0x6352211e", "ownerOf(uint256)", { "tokenId": p.uint256 }, p.address),
    renounceOwnership: (0, evm_abi_1.fun)("0x715018a6", "renounceOwnership()", {}),
    "safeTransferFrom(address,address,uint256)": (0, evm_abi_1.fun)("0x42842e0e", "safeTransferFrom(address,address,uint256)", { "from": p.address, "to": p.address, "tokenId": p.uint256 }),
    "safeTransferFrom(address,address,uint256,bytes)": (0, evm_abi_1.fun)("0xb88d4fde", "safeTransferFrom(address,address,uint256,bytes)", { "from": p.address, "to": p.address, "tokenId": p.uint256, "data": p.bytes }),
    setApprovalForAll: (0, evm_abi_1.fun)("0xa22cb465", "setApprovalForAll(address,bool)", { "operator": p.address, "approved": p.bool }),
    supportsInterface: (0, evm_abi_1.viewFun)("0x01ffc9a7", "supportsInterface(bytes4)", { "interfaceId": p.bytes4 }, p.bool),
    symbol: (0, evm_abi_1.viewFun)("0x95d89b41", "symbol()", {}, p.string),
    tokenURI: (0, evm_abi_1.viewFun)("0xc87b56dd", "tokenURI(uint256)", { "tokenId": p.uint256 }, p.string),
    transferFrom: (0, evm_abi_1.fun)("0x23b872dd", "transferFrom(address,address,uint256)", { "from": p.address, "to": p.address, "tokenId": p.uint256 }),
    transferOwnership: (0, evm_abi_1.fun)("0xf2fde38b", "transferOwnership(address)", { "newOwner": p.address }),
    updateBaseURI: (0, evm_abi_1.fun)("0x931688cb", "updateBaseURI(string)", { "newBaseURI": p.string }),
    updateTokenIdAffixes: (0, evm_abi_1.fun)("0xf9b7981e", "updateTokenIdAffixes(string,string)", { "newPrefix": p.string, "newSuffix": p.string }),
    wasEverTransferred: (0, evm_abi_1.viewFun)("0xd4b89d8d", "wasEverTransferred(uint256)", { "tokenId": p.uint256 }, p.bool),
};
class Contract extends evm_abi_1.ContractBase {
    ERC721UniversalVersion() {
        return this.eth_call(exports.functions.ERC721UniversalVersion, {});
    }
    balanceOf(_owner) {
        return this.eth_call(exports.functions.balanceOf, { _owner });
    }
    baseURI() {
        return this.eth_call(exports.functions.baseURI, {});
    }
    getApproved(tokenId) {
        return this.eth_call(exports.functions.getApproved, { tokenId });
    }
    initOwner(tokenId) {
        return this.eth_call(exports.functions.initOwner, { tokenId });
    }
    isApprovedForAll(owner, operator) {
        return this.eth_call(exports.functions.isApprovedForAll, { owner, operator });
    }
    isBaseURILocked() {
        return this.eth_call(exports.functions.isBaseURILocked, {});
    }
    isBurned(tokenId) {
        return this.eth_call(exports.functions.isBurned, { tokenId });
    }
    name() {
        return this.eth_call(exports.functions.name, {});
    }
    owner() {
        return this.eth_call(exports.functions.owner, {});
    }
    ownerOf(tokenId) {
        return this.eth_call(exports.functions.ownerOf, { tokenId });
    }
    supportsInterface(interfaceId) {
        return this.eth_call(exports.functions.supportsInterface, { interfaceId });
    }
    symbol() {
        return this.eth_call(exports.functions.symbol, {});
    }
    tokenURI(tokenId) {
        return this.eth_call(exports.functions.tokenURI, { tokenId });
    }
    wasEverTransferred(tokenId) {
        return this.eth_call(exports.functions.wasEverTransferred, { tokenId });
    }
}
exports.Contract = Contract;
//# sourceMappingURL=UniversalContract.js.map