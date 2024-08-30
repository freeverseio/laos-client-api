"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEventWithExternalURIToTokenUri = mapEventWithExternalURIToTokenUri;
exports.createTokenUriModels = createTokenUriModels;
const model_1 = require("../../model");
function mapEventWithExternalURIToTokenUri(raw) {
    const tokenUri = new model_1.TokenUri({
        id: raw._tokenURI,
        state: model_1.TokenUriFetchState.Pending,
    });
    return tokenUri;
}
function createTokenUriModels(rawEvents) {
    const tokenUris = rawEvents.map((raw) => mapEventWithExternalURIToTokenUri(raw));
    // remove duplicated ids
    return tokenUris.filter((tokenUri, index, self) => index === self.findIndex(t => t.id === tokenUri.id));
}
//# sourceMappingURL=tokenUriMapper.js.map