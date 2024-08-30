"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockLogsEvolvedEvents = exports.mockLogsMintedEvents = exports.mockLogs = void 0;
exports.mockLogs = [
    {
        id: 'mock-log-id-3',
        logIndex: 2,
        transactionIndex: 2,
        address: '0x31E1818e4ca0f7DEFe50009a2B99485C4B6B795F',
        transactionHash: '0x5241a174fe69745981505ce85fcae52c68060cbeb7f7be473f7e6a5b2af304b0',
        data: '0x00000000000000000000000031e1818e4ca0f7defe50009a2b99485c4b6b795f000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c268747470733a2f2f756c6f632e696f2f476c6f62616c436f6e73656e73757328303a307834373536633430343261343331616432626265363164386334623936366331333238653761386461613031313065396262643364343031333133386130626434292f50617261636861696e2832303030292f50616c6c6574496e7374616e6365283531292f4163636f756e744b6579323028307866666666666666666666666666666666666666666666666530303030303030303030303030303231292f000000000000000000000000000000000000000000000000000000000000',
        topics: ['0x74b81bc88402765a52dad72d3d893684f472a679558f3641500e0ee14924a10a'],
        block: {
            id: 'mock-block-id',
            height: 12345,
            hash: 'mock-block-hash',
            parentHash: 'mock-parent-hash',
            timestamp: 1620000000,
        },
        getTransaction: () => ({
        // Define mock transaction data if needed
        }),
    },
    {
        id: 'mock-log-id-4',
        logIndex: 3,
        transactionIndex: 3,
        address: '0x31E1818e4ca0f7DEFe50009a2B99485C4B6B795F',
        transactionHash: '0x1d7bd207884864f063499aafac0bb83967d6e12c3692f408fa05327d8c74d149',
        data: '0x',
        topics: [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x000000000000000000000000c52293dcf9be02c6ef7e6f840bf0f0e2fc45c646",
            "0x0000000000000000000000008e4dfc6d56e84913fa6a901a3df21de6e9285de8",
            "0x000000000000000000000001c52293dcf9be02c6ef7e6f840bf0f0e2fc45c646",
        ],
        block: {
            id: 'mock-block-id',
            height: 12345,
            hash: 'mock-block-hash',
            parentHash: 'mock-parent-hash',
            timestamp: 1620000000,
        },
        getTransaction: () => ({
        // Define mock transaction data if needed
        }),
    }
];
exports.mockLogsMintedEvents = [
    {
        id: 'mock-log-id-1',
        logIndex: 0,
        transactionIndex: 0,
        address: "0xffFfFFFffFfFFFfFffFFFFFe0000000000000044",
        transactionHash: "0x9d2e7d2c2549bc315807d3c304d39a1a8243ee3a3925c97f4b153e5fb587a3d5",
        data: '0x0000000000000000000000000000000000000000602162104133940000000000602162104133940000000000d3994b84070a87aa81857c3402ff6afb09248b0600000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000035697066733a2f2f516d577743503234505347774c52764e3252375332344448537156794e3873455a7074774e38457567784b7872510000000000000000000000',
        topics: ['0xa7135052b348b0b4e9943bae82d8ef1c5ac225e594ef4271d12f0744cfc98348', '0x000000000000000000000000d3994b84070a87aa81857c3402ff6afb09248b06'],
        block: {
            id: 'mock-block-id',
            height: 12345,
            hash: 'mock-block-hash',
            parentHash: 'mock-parent-hash',
            timestamp: 1620000000,
        },
        getTransaction: () => ({
        // Define mock transaction data if needed
        }),
    },
    {
        id: 'mock-log-id-2',
        logIndex: 1,
        transactionIndex: 1,
        address: "0xffFfFFFffFfFFFfFffFFFFFe0000000000000044",
        transactionHash: "0x9d2e7d2c2549bc315807d3c304d39a1a8243ee3a3925c97f4b153e5fb587a3d5",
        data: '0x000000000000000000000000000000000000000009262f22ac59e1800000000009262f22ac59e18000000000637b4840c99925d9d9698b4a552c447f1cd155dd00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000035697066733a2f2f516d59585067314e6b504432724d4469336f4851577352356b666f5a673846514c4e4c6d5737356272484b5471560000000000000000000000',
        topics: ['0xa7135052b348b0b4e9943bae82d8ef1c5ac225e594ef4271d12f0744cfc98348', '0x000000000000000000000000d3994b84070a87aa81857c3402ff6afb09248b06'],
        block: {
            id: 'mock-block-id',
            height: 12345,
            hash: 'mock-block-hash',
            parentHash: 'mock-parent-hash',
            timestamp: 1620000000,
        },
        getTransaction: () => ({
        // Define mock transaction data if needed
        }),
    }
];
exports.mockLogsEvolvedEvents = [
    {
        id: 'mock-log-id-evolved-1',
        logIndex: 0,
        transactionIndex: 0,
        address: "0xffffFfffFFfFFffFffFFFFfe000000000000036E",
        transactionHash: "0xevolvedTransactionHash",
        data: '0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000035697066733a2f2f516d61343452634576656d68454362657244654b6661337538344d7a4d44663375313548385245315a78777672570000000000000000000000',
        topics: ['0xdde18ad2fe10c12a694de65b920c02b851c382cf63115967ea6f7098902fa1c8', '0x13e18245e8f0f600000000001b0b4a597c764400ea157ab84358c8788a89cd28'],
        block: {
            id: 'mock-block-id-evolved',
            height: 12346,
            hash: 'mock-block-hash-evolved',
            parentHash: 'mock-parent-hash-evolved',
            timestamp: 1620000001,
        },
        getTransaction: () => ({
        // Define mock transaction data if needed
        }),
    }
];
//# sourceMappingURL=mockdata.js.map