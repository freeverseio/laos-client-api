"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseURITokens = exports.parseBaseURI = void 0;
exports.generateAssetUUID = generateAssetUUID;
exports.getAccountKey20FromBaseUri = getAccountKey20FromBaseUri;
const crypto_1 = require("crypto");
const uuid_1 = require("uuid");
function generateAssetUUID(tokenId, contractAddress) {
    const combinedString = tokenId + contractAddress;
    const hash = (0, crypto_1.createHash)('sha256').update(combinedString).digest('hex');
    // Use the hash as the name for a namespace-based UUID (UUID v5)
    const namespace = 'c80dfd13-4025-4b97-ac1b-cde3aca8cf31';
    const uuid = (0, uuid_1.v5)(hash, namespace);
    return uuid;
}
function getAccountKey20FromBaseUri(baseUri) {
    const startKeyword = "AccountKey20(";
    const start = baseUri.indexOf(startKeyword);
    let accountKey20Value = null;
    if (start !== -1) {
        const end = baseUri.indexOf(')', start + startKeyword.length);
        if (end !== -1) {
            accountKey20Value = baseUri.substring(start + startKeyword.length, end);
        }
    }
    return accountKey20Value;
}
const parseBaseURI = (baseUri) => {
    const tokens = (0, exports.getBaseURITokens)(baseUri);
    if (!tokens) {
        return null;
    }
    //TODO get from envVar
    const laosGlobalConsensusValue = process.env.LAOS_GLOBAL_CONSENSUS;
    const laosParachainValue = process.env.LAOS_PARACHAIN;
    const laosPalletInstanceValue = process.env.LAOS_PALLET_INSTANCE;
    const laosGlobalConsensus = `GlobalConsensus(${laosGlobalConsensusValue})`;
    const laosParachain = `Parachain(${laosParachainValue})`;
    const laosPalletInstance = `PalletInstance(${laosPalletInstanceValue})`;
    if (tokens.length < 3 || tokens[0] !== laosGlobalConsensus || tokens[1] !== laosParachain || tokens[2] !== laosPalletInstance) {
        console.warn(`Invalid baseURI: ${baseUri}`);
        console.log('GlobalConsensus: ', tokens[0], tokens[0] === laosGlobalConsensus);
        console.log('Parachain: ', tokens[1], tokens[1] === laosParachain);
        console.log('PalletInstance: ', tokens[2], tokens[2] === laosPalletInstance);
        return null;
    }
    const accountKey20 = getAccountKey20(tokens[3]);
    let generalKey = null;
    if (tokens.length > 4 && tokens[4] !== '') {
        generalKey = getGeneralKey(tokens[4]);
    }
    const ulocPrefix = tokens[0] + '/' + tokens[1] + '/' + tokens[2] + '/';
    return {
        globalConsensus: tokens[0],
        parachain: tokens[1],
        palletInstance: tokens[2],
        accountKey20: accountKey20,
        generalKey: generalKey,
        ulocPrefix: ulocPrefix,
    };
};
exports.parseBaseURI = parseBaseURI;
function getAccountKey20(str) {
    const prefix = 'AccountKey20(';
    if (!str.startsWith(prefix) || !str.endsWith(')')) {
        console.error("AccountKey parameter is not correct: 'AccountKey20(' contractAddress ')'.");
        return null;
    }
    const data = str.substring(prefix.length, str.length - 1);
    return data;
}
function getGeneralKey(str) {
    const prefix = 'GeneralKey(';
    if (!str.startsWith(prefix) || !str.endsWith(')')) {
        console.error("GeneralKey parameter is not correct: 'GeneralKey(' tokenId ')'.");
        return null;
    }
    const data = str.substring(prefix.length, str.length - 1);
    return data;
}
const getBaseURITokens = (baseUri) => {
    if (!baseUri) {
        return null;
    }
    let prefix = 'https://uloc.io/';
    if (!baseUri.startsWith(prefix)) {
        prefix = 'uloc://';
        if (!baseUri.startsWith(prefix)) {
            console.warn("BaseURI error format. It should start with 'https://uloc.io/' or 'uloc://'.", baseUri);
            return null;
        }
    }
    const str = baseUri.substring(prefix.length);
    const tokens = str.split('/');
    // Check if the baseURI ends with / or not but have at least 3 parameters
    if (tokens.length < 4) {
        console.error(`Invalid baseURI: ${baseUri}`);
        return null;
    }
    return tokens;
};
exports.getBaseURITokens = getBaseURITokens;
//# sourceMappingURL=util.js.map