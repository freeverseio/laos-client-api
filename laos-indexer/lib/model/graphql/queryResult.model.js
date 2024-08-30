"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenHistoryQueryResult = exports.TransferQueryResult = exports.TokenConnection = exports.TokenEdge = exports.TokenQueryResultSelect = exports.TokenQueryResult = exports.PageInfo = void 0;
const type_graphql_1 = require("type-graphql");
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
let PageInfo = class PageInfo {
    constructor(props) {
        Object.assign(this, props);
    }
};
exports.PageInfo = PageInfo;
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PageInfo.prototype, "endCursor", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], PageInfo.prototype, "hasNextPage", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], PageInfo.prototype, "hasPreviousPage", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PageInfo.prototype, "startCursor", void 0);
exports.PageInfo = PageInfo = __decorate([
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], PageInfo);
let TokenQueryResult = class TokenQueryResult {
    constructor(props) {
        Object.assign(this, props);
    }
};
exports.TokenQueryResult = TokenQueryResult;
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    __metadata("design:type", String)
], TokenQueryResult.prototype, "tokenId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    __metadata("design:type", String)
], TokenQueryResult.prototype, "owner", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], TokenQueryResult.prototype, "tokenUri", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], TokenQueryResult.prototype, "tokenUriFetchState", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], TokenQueryResult.prototype, "contractAddress", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: false }),
    __metadata("design:type", Date)
], TokenQueryResult.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    __metadata("design:type", String)
], TokenQueryResult.prototype, "initialOwner", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], TokenQueryResult.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], TokenQueryResult.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], TokenQueryResult.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    __metadata("design:type", Object)
], TokenQueryResult.prototype, "attributes", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number, { nullable: false }),
    __metadata("design:type", Number)
], TokenQueryResult.prototype, "block_number", void 0);
exports.TokenQueryResult = TokenQueryResult = __decorate([
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], TokenQueryResult);
let TokenQueryResultSelect = class TokenQueryResultSelect extends TokenQueryResult {
    constructor(props) {
        super(props);
        Object.assign(this, props);
    }
};
exports.TokenQueryResultSelect = TokenQueryResultSelect;
__decorate([
    (0, type_graphql_1.Field)(() => Number, { nullable: false }),
    __metadata("design:type", Number)
], TokenQueryResultSelect.prototype, "logIndex", void 0);
exports.TokenQueryResultSelect = TokenQueryResultSelect = __decorate([
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], TokenQueryResultSelect);
let TokenEdge = class TokenEdge {
    constructor(cursor, node) {
        this.cursor = cursor;
        this.node = node;
    }
};
exports.TokenEdge = TokenEdge;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TokenEdge.prototype, "cursor", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => TokenQueryResult),
    __metadata("design:type", TokenQueryResult)
], TokenEdge.prototype, "node", void 0);
exports.TokenEdge = TokenEdge = __decorate([
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [String, TokenQueryResult])
], TokenEdge);
let TokenConnection = class TokenConnection {
    constructor(edges, pageInfo) {
        this.edges = edges;
        this.pageInfo = pageInfo;
    }
};
exports.TokenConnection = TokenConnection;
__decorate([
    (0, type_graphql_1.Field)(() => [TokenEdge]),
    __metadata("design:type", Array)
], TokenConnection.prototype, "edges", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PageInfo),
    __metadata("design:type", PageInfo)
], TokenConnection.prototype, "pageInfo", void 0);
exports.TokenConnection = TokenConnection = __decorate([
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Array, PageInfo])
], TokenConnection);
let TransferQueryResult = class TransferQueryResult {
    constructor(props) {
        Object.assign(this, props);
    }
};
exports.TransferQueryResult = TransferQueryResult;
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    __metadata("design:type", String)
], TransferQueryResult.prototype, "from", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    __metadata("design:type", String)
], TransferQueryResult.prototype, "to", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: false }),
    __metadata("design:type", Date)
], TransferQueryResult.prototype, "timestamp", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number, { nullable: false }),
    __metadata("design:type", Number)
], TransferQueryResult.prototype, "blockNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    __metadata("design:type", String)
], TransferQueryResult.prototype, "txHash", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    __metadata("design:type", String)
], TransferQueryResult.prototype, "tokenId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], TransferQueryResult.prototype, "contractAddress", void 0);
exports.TransferQueryResult = TransferQueryResult = __decorate([
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], TransferQueryResult);
let TokenHistoryQueryResult = class TokenHistoryQueryResult {
    constructor(init) {
        Object.assign(this, init);
    }
};
exports.TokenHistoryQueryResult = TokenHistoryQueryResult;
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], TokenHistoryQueryResult.prototype, "contractAddress", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], TokenHistoryQueryResult.prototype, "tokenUri", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], TokenHistoryQueryResult.prototype, "tokenUriFetchState", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], TokenHistoryQueryResult.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], TokenHistoryQueryResult.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], TokenHistoryQueryResult.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    __metadata("design:type", Object)
], TokenHistoryQueryResult.prototype, "attributes", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number, { nullable: false }),
    __metadata("design:type", Number)
], TokenHistoryQueryResult.prototype, "block_number", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: false }),
    __metadata("design:type", String)
], TokenHistoryQueryResult.prototype, "tx_hash", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: false }),
    __metadata("design:type", Date)
], TokenHistoryQueryResult.prototype, "updatedAt", void 0);
exports.TokenHistoryQueryResult = TokenHistoryQueryResult = __decorate([
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], TokenHistoryQueryResult);
//# sourceMappingURL=queryResult.model.js.map