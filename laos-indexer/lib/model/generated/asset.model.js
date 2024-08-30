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
exports.Asset = void 0;
const typeorm_store_1 = require("@subsquid/typeorm-store");
const ownershipContract_model_1 = require("./ownershipContract.model");
const transfer_model_1 = require("./transfer.model");
let Asset = class Asset {
    constructor(props) {
        Object.assign(this, props);
    }
};
exports.Asset = Asset;
__decorate([
    (0, typeorm_store_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Asset.prototype, "id", void 0);
__decorate([
    (0, typeorm_store_1.Index)(),
    (0, typeorm_store_1.ManyToOne)(() => ownershipContract_model_1.OwnershipContract, { nullable: true }),
    __metadata("design:type", ownershipContract_model_1.OwnershipContract)
], Asset.prototype, "ownershipContract", void 0);
__decorate([
    (0, typeorm_store_1.BigIntColumn)({ nullable: false }),
    __metadata("design:type", BigInt)
], Asset.prototype, "tokenId", void 0);
__decorate([
    (0, typeorm_store_1.StringColumn)({ nullable: false }),
    __metadata("design:type", String)
], Asset.prototype, "owner", void 0);
__decorate([
    (0, typeorm_store_1.OneToMany)(() => transfer_model_1.Transfer, e => e.asset),
    __metadata("design:type", Array)
], Asset.prototype, "transfers", void 0);
exports.Asset = Asset = __decorate([
    (0, typeorm_store_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Asset);
//# sourceMappingURL=asset.model.js.map