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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenResolver = void 0;
const type_graphql_1 = require("type-graphql");
const model_1 = require("../../model");
const QueryBuilderService_1 = require("../service/QueryBuilderService");
let TokenResolver = class TokenResolver {
    constructor(tx) {
        this.tx = tx;
        this.queryBuilderService = new QueryBuilderService_1.QueryBuilderService();
    }
    async fetchTokens(manager, query, parameters) {
        const results = await manager.query(query, parameters);
        return results.map((result) => {
            return new model_1.TokenQueryResultSelect({
                ...result,
                createdAt: new Date(result.createdAt),
            });
        });
    }
    async token(contractAddress, tokenId) {
        const manager = await this.tx();
        const { query, parameters } = await this.queryBuilderService.buildTokenByIdQuery(contractAddress, tokenId);
        const result = await manager.query(query, parameters);
        if (result.length === 0) {
            return null;
        }
        const transformedResult = {
            ...result[0],
            createdAt: new Date(result[0].createdAt)
        };
        return new model_1.TokenQueryResult(transformedResult);
    }
    async tokens(where, pagination, orderBy) {
        const manager = await this.tx();
        const { query, parameters } = await this.queryBuilderService.buildTokenQuery(where, pagination, orderBy);
        const tokens = await this.fetchTokens(manager, query, parameters);
        const hasNextPage = tokens.length > pagination.first;
        if (hasNextPage) {
            tokens.pop();
        }
        const edges = tokens.map(token => ({
            cursor: Buffer.from(`${new Date(token.createdAt).getTime()}:${token.logIndex}:${token.contractAddress}`).toString('base64'),
            node: {
                ...token,
                createdAt: new Date(token.createdAt)
            }
        }));
        const pageInfo = new model_1.PageInfo({
            endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : undefined,
            hasNextPage: hasNextPage,
            hasPreviousPage: Boolean(pagination.after),
            startCursor: edges.length > 0 ? edges[0].cursor : undefined,
        });
        return new model_1.TokenConnection(edges, pageInfo);
    }
};
exports.TokenResolver = TokenResolver;
__decorate([
    (0, type_graphql_1.Query)(() => model_1.TokenQueryResult, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('contractAddress', () => String)),
    __param(1, (0, type_graphql_1.Arg)('tokenId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TokenResolver.prototype, "token", null);
__decorate([
    (0, type_graphql_1.Query)(() => model_1.TokenConnection, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('where', () => model_1.TokenWhereInput, { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('pagination', () => model_1.TokenPaginationInput, { nullable: false, defaultValue: { first: 10 } })),
    __param(2, (0, type_graphql_1.Arg)('orderBy', () => model_1.TokenOrderByOptions, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_1.TokenWhereInput,
        model_1.TokenPaginationInput, String]),
    __metadata("design:returntype", Promise)
], TokenResolver.prototype, "tokens", null);
exports.TokenResolver = TokenResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [Function])
], TokenResolver);
//# sourceMappingURL=TokenResolver.js.map