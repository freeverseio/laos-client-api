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
exports.OwnershipContract = void 0;
const typeorm_store_1 = require("@subsquid/typeorm-store");
const asset_model_1 = require("./asset.model");
let OwnershipContract = class OwnershipContract {
    constructor(props) {
        Object.assign(this, props);
    }
};
exports.OwnershipContract = OwnershipContract;
__decorate([
    (0, typeorm_store_1.PrimaryColumn)(),
    __metadata("design:type", String)
], OwnershipContract.prototype, "id", void 0);
__decorate([
    (0, typeorm_store_1.Index)(),
    (0, typeorm_store_1.StringColumn)({ nullable: true }),
    __metadata("design:type", Object)
], OwnershipContract.prototype, "laosContract", void 0);
__decorate([
    (0, typeorm_store_1.OneToMany)(() => asset_model_1.Asset, e => e.ownershipContract),
    __metadata("design:type", Array)
], OwnershipContract.prototype, "assets", void 0);
exports.OwnershipContract = OwnershipContract = __decorate([
    (0, typeorm_store_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], OwnershipContract);
//# sourceMappingURL=ownershipContract.model.js.map