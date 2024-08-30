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
exports.TokenHistoryResolver = void 0;
const type_graphql_1 = require("type-graphql");
const model_1 = require("../../model");
let TokenHistoryResolver = class TokenHistoryResolver {
    constructor(tx) {
        this.tx = tx;
    }
    async fetchTokenHistory(manager, query, parameters) {
        const results = await manager.query(query, parameters);
        return results.map((result) => {
            if (typeof result.attributes === 'string') {
                result.attributes = JSON.parse(result.attributes);
            }
            return new model_1.TokenHistoryQueryResult({
                ...result,
                updatedAt: new Date(result.updatedAt),
            });
        });
    }
    async tokenHistory(contractAddress, tokenId, pagination) {
        const manager = await this.tx();
        const normalizedContractAddress = contractAddress.toLowerCase(); // Convert to lowercase
        const effectiveLimit = pagination?.limit || 10;
        const effectiveOffset = pagination?.offset || 0;
        const effectiveOrderBy = pagination?.orderBy || model_1.TokenHistoryOrderByOptions.UPDATED_AT_DESC;
        const query = `
      SELECT 
        tu.id AS "tokenUri",
        tu.name AS name,
        tu.description AS description,
        tu.image AS image,
        tu.attributes AS attributes,
        tu.state AS "tokenUriFetchState",
        m.block_number,
        m.tx_hash,
        m."timestamp" as "updatedAt",
        oc.id AS "contractAddress"
      FROM 
        metadata m
      INNER JOIN 
        laos_asset la ON m.laos_asset_id = la.id
      INNER JOIN 
        ownership_contract oc ON LOWER(la.laos_contract) = LOWER(oc.laos_contract)
      INNER JOIN 
        token_uri tu ON m.token_uri_id = tu.id
      WHERE 
        la.token_id = $1
        AND LOWER(oc.id) = $2
      ORDER BY ${effectiveOrderBy}
      LIMIT $3 OFFSET $4;
    `;
        const results = await this.fetchTokenHistory(manager, query, [tokenId, normalizedContractAddress, effectiveLimit, effectiveOffset]);
        return results.length > 0 ? results : null;
    }
};
exports.TokenHistoryResolver = TokenHistoryResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [model_1.TokenHistoryQueryResult], { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('contractAddress', () => String)),
    __param(1, (0, type_graphql_1.Arg)('tokenId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('pagination', () => model_1.TokenHistoryPaginationInput, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, model_1.TokenHistoryPaginationInput]),
    __metadata("design:returntype", Promise)
], TokenHistoryResolver.prototype, "tokenHistory", null);
exports.TokenHistoryResolver = TokenHistoryResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [Function])
], TokenHistoryResolver);
//# sourceMappingURL=TokenHistoryResolver.js.map