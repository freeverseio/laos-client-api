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
exports.TransferResolver = void 0;
const type_graphql_1 = require("type-graphql");
const model_1 = require("../../model");
let TransferResolver = class TransferResolver {
    constructor(tx) {
        this.tx = tx;
    }
    async transfers(where, pagination, orderBy) {
        const manager = await this.tx();
        // Build the query with pagination and filters
        let query = manager.createQueryBuilder(model_1.Transfer, 'transfer')
            .innerJoinAndSelect('transfer.asset', 'asset')
            .innerJoinAndSelect('asset.ownershipContract', 'ownershipContract')
            .innerJoin(model_1.LaosAsset, 'laosAsset', 'laosAsset.tokenId = asset.tokenId AND laosAsset.laosContract = ownershipContract.laosContract');
        // Add filters based on where input
        if (where) {
            if (where.tokenId) {
                query = query.andWhere('asset.tokenId = :tokenId', { tokenId: where.tokenId });
            }
            if (where.contractAddress) {
                query = query.andWhere('ownershipContract.id = :contractAddress', { contractAddress: where.contractAddress });
            }
            if (where.to) {
                query = query.andWhere('transfer.to = :to', { to: where.to });
            }
            if (where.from) {
                query = query.andWhere('transfer.from = :from', { from: where.from });
            }
        }
        if (orderBy) {
            const orderByOptions = orderBy.split(' ');
            let order;
            order = orderByOptions[1];
            query = query.orderBy(orderByOptions[0], order);
        }
        if (pagination) {
            if (pagination.limit) {
                query = query.limit(pagination.limit);
            }
            if (pagination.offset) {
                query = query.offset(pagination.offset);
            }
        }
        const transfers = await query.getMany();
        // Map to TransferQueryResult
        return transfers.map(transfer => new model_1.TransferQueryResult({
            from: transfer.from,
            to: transfer.to,
            timestamp: transfer.timestamp,
            blockNumber: transfer.blockNumber,
            txHash: transfer.txHash,
            tokenId: transfer.asset.tokenId.toString(),
            contractAddress: transfer.asset.ownershipContract.id
        }));
    }
};
exports.TransferResolver = TransferResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [model_1.TransferQueryResult], { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('where', () => model_1.TransferWhereInput, { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('pagination', () => model_1.TransferPaginationInput, { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('orderBy', () => model_1.TransferOrderByOptions, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_1.TransferWhereInput,
        model_1.TransferPaginationInput, String]),
    __metadata("design:returntype", Promise)
], TransferResolver.prototype, "transfers", null);
exports.TransferResolver = TransferResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [Function])
], TransferResolver);
//# sourceMappingURL=TransferResolver.js.map