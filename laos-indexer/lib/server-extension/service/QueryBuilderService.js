"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilderService = void 0;
const model_1 = require("../../model");
const queries_1 = require("./queries");
class QueryBuilderService {
    buildWhereConditions(where) {
        let conditions = [];
        let parameters = [];
        let paramIndex = 1;
        if (where?.owner) {
            conditions.push(`LOWER(COALESCE(a.owner, la.initial_owner)) = LOWER($${paramIndex++})`);
            parameters.push(where.owner.toLowerCase());
        }
        if (where?.contractAddress) {
            conditions.push(`LOWER(oc.id) = LOWER($${paramIndex++})`);
            parameters.push(where.contractAddress.toLowerCase());
        }
        return { conditions, parameters, paramIndex };
    }
    buildCursorCondition(afterCursor, effectiveOrderBy, paramIndex) {
        const decodedCursor = Buffer.from(afterCursor, 'base64').toString('ascii');
        const [afterCreatedAt, afterLogIndex, afterContractId] = decodedCursor.split(':').map(part => part.trim());
        let condition = '';
        let parameters = [];
        if (effectiveOrderBy === model_1.TokenOrderByOptions.CREATED_AT_ASC) {
            condition = `("la"."created_at" > to_timestamp($${paramIndex++} / 1000.0) 
        OR ("la"."created_at" = to_timestamp($${paramIndex - 1} / 1000.0) 
        AND (la.log_index > $${paramIndex++} 
        OR (la.log_index = $${paramIndex - 1} AND LOWER(oc.id) > LOWER($${paramIndex++})))))`;
        }
        else {
            condition = `("la"."created_at" < to_timestamp($${paramIndex++} / 1000.0) 
        OR ("la"."created_at" = to_timestamp($${paramIndex - 1} / 1000.0) 
        AND (la.log_index < $${paramIndex++} 
        OR (la.log_index = $${paramIndex - 1} AND LOWER(oc.id) > LOWER($${paramIndex++})))))`;
        }
        parameters.push(afterCreatedAt);
        parameters.push(afterLogIndex);
        parameters.push(afterContractId.toLowerCase());
        return { condition, parameters, paramIndex };
    }
    getOrderDetails(orderBy = model_1.TokenOrderByOptions.CREATED_AT_ASC) {
        const effectiveOrderBy = orderBy || model_1.TokenOrderByOptions.CREATED_AT_ASC;
        const orderDirection = effectiveOrderBy.split(' ')[1];
        return { effectiveOrderBy, orderDirection };
    }
    async buildTokenQuery(where, pagination, orderBy) {
        const effectiveFirst = pagination.first;
        const afterCursor = pagination.after;
        const { effectiveOrderBy, orderDirection } = this.getOrderDetails(orderBy);
        const { conditions, parameters, paramIndex: initialParamIndex } = this.buildWhereConditions(where);
        let paramIndex = initialParamIndex;
        if (afterCursor) {
            const { condition, parameters: cursorParameters, paramIndex: newParamIndex } = this.buildCursorCondition(afterCursor, effectiveOrderBy, paramIndex);
            conditions.push(condition);
            parameters.push(...cursorParameters);
            paramIndex = newParamIndex;
        }
        const query = `
      ${queries_1.buildTokenQueryBase}
      ${conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''}
      ORDER BY ${effectiveOrderBy}, la.log_index ${orderDirection}, oc.id ASC
      LIMIT $${paramIndex}
    `;
        parameters.push(effectiveFirst + 1);
        return { query, parameters };
    }
    async buildTokenByIdQuery(ownershipContractId, tokenId) {
        const normalizedOwnershipContractId = ownershipContractId.toLowerCase(); // Convert to lowercase
        const parameters = [normalizedOwnershipContractId, tokenId];
        return { query: queries_1.buildTokenByIdQuery, parameters };
    }
}
exports.QueryBuilderService = QueryBuilderService;
//# sourceMappingURL=QueryBuilderService.js.map