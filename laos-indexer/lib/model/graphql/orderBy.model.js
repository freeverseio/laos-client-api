"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenHistoryOrderByOptions = exports.TokenOrderByOptions = exports.TransferOrderByOptions = void 0;
const type_graphql_1 = require("type-graphql");
var TransferOrderByOptions;
(function (TransferOrderByOptions) {
    TransferOrderByOptions["TIMESTAMP_ASC"] = "timestamp ASC";
    TransferOrderByOptions["TIMESTAMP_DESC"] = "timestamp DESC";
    TransferOrderByOptions["BLOCKNUMBER_ASC"] = "block_number ASC";
    TransferOrderByOptions["BLOCKNUMBER_DESC"] = "block_number DESC";
})(TransferOrderByOptions || (exports.TransferOrderByOptions = TransferOrderByOptions = {}));
var TokenOrderByOptions;
(function (TokenOrderByOptions) {
    TokenOrderByOptions["CREATED_AT_ASC"] = "created_at ASC";
    TokenOrderByOptions["CREATED_AT_DESC"] = "created_at DESC";
})(TokenOrderByOptions || (exports.TokenOrderByOptions = TokenOrderByOptions = {}));
var TokenHistoryOrderByOptions;
(function (TokenHistoryOrderByOptions) {
    TokenHistoryOrderByOptions["UPDATED_AT_ASC"] = "timestamp ASC";
    TokenHistoryOrderByOptions["UPDATED_AT_DESC"] = "timestamp DESC";
})(TokenHistoryOrderByOptions || (exports.TokenHistoryOrderByOptions = TokenHistoryOrderByOptions = {}));
// Register TransferOrderByOptions
(0, type_graphql_1.registerEnumType)(TransferOrderByOptions, {
    name: 'TransferOrderByOptions',
    description: 'Possible options for ordering transfers',
});
// Register AssetOrderByOptions
(0, type_graphql_1.registerEnumType)(TokenOrderByOptions, {
    name: 'TokenOrderByOptions',
    description: 'Possible options for ordering tokens',
});
(0, type_graphql_1.registerEnumType)(TokenHistoryOrderByOptions, {
    name: 'TokenHistoryOrderByOptions',
    description: 'Possible options for ordering token histories',
});
//# sourceMappingURL=orderBy.model.js.map