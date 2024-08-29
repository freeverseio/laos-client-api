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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenWhereInput = exports.TransferWhereInput = void 0;
const type_graphql_1 = require("type-graphql");
let TransferWhereInput = class TransferWhereInput {
};
exports.TransferWhereInput = TransferWhereInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TransferWhereInput.prototype, "tokenId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TransferWhereInput.prototype, "contractAddress", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TransferWhereInput.prototype, "to", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TransferWhereInput.prototype, "from", void 0);
exports.TransferWhereInput = TransferWhereInput = __decorate([
    (0, type_graphql_1.InputType)()
], TransferWhereInput);
let TokenWhereInput = class TokenWhereInput {
};
exports.TokenWhereInput = TokenWhereInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TokenWhereInput.prototype, "contractAddress", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TokenWhereInput.prototype, "owner", void 0);
exports.TokenWhereInput = TokenWhereInput = __decorate([
    (0, type_graphql_1.InputType)()
], TokenWhereInput);
//# sourceMappingURL=queryClause.model.js.map