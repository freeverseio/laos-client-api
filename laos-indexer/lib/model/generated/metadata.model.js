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
exports.Metadata = void 0;
const typeorm_store_1 = require("@subsquid/typeorm-store");
const laosAsset_model_1 = require("./laosAsset.model");
const tokenUri_model_1 = require("./tokenUri.model");
let Metadata = class Metadata {
    constructor(props) {
        Object.assign(this, props);
    }
};
exports.Metadata = Metadata;
__decorate([
    (0, typeorm_store_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Metadata.prototype, "id", void 0);
__decorate([
    (0, typeorm_store_1.Index)(),
    (0, typeorm_store_1.ManyToOne)(() => laosAsset_model_1.LaosAsset, { nullable: true }),
    __metadata("design:type", laosAsset_model_1.LaosAsset)
], Metadata.prototype, "laosAsset", void 0);
__decorate([
    (0, typeorm_store_1.Index)(),
    (0, typeorm_store_1.ManyToOne)(() => tokenUri_model_1.TokenUri, { nullable: true }),
    __metadata("design:type", tokenUri_model_1.TokenUri)
], Metadata.prototype, "tokenUri", void 0);
__decorate([
    (0, typeorm_store_1.IntColumn)({ nullable: false }),
    __metadata("design:type", Number)
], Metadata.prototype, "blockNumber", void 0);
__decorate([
    (0, typeorm_store_1.DateTimeColumn)({ nullable: false }),
    __metadata("design:type", Date)
], Metadata.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_store_1.Index)(),
    (0, typeorm_store_1.StringColumn)({ nullable: false }),
    __metadata("design:type", String)
], Metadata.prototype, "txHash", void 0);
exports.Metadata = Metadata = __decorate([
    (0, typeorm_store_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Metadata);
//# sourceMappingURL=metadata.model.js.map