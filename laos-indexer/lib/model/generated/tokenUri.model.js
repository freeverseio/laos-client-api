"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenUri = void 0;
const typeorm_store_1 = require("@subsquid/typeorm-store");
const marshal = __importStar(require("./marshal"));
const _attribute_1 = require("./_attribute");
const metadata_model_1 = require("./metadata.model");
let TokenUri = class TokenUri {
    constructor(props) {
        Object.assign(this, props);
    }
};
exports.TokenUri = TokenUri;
__decorate([
    (0, typeorm_store_1.PrimaryColumn)(),
    __metadata("design:type", String)
], TokenUri.prototype, "id", void 0);
__decorate([
    (0, typeorm_store_1.StringColumn)({ nullable: false }),
    __metadata("design:type", String)
], TokenUri.prototype, "state", void 0);
__decorate([
    (0, typeorm_store_1.StringColumn)({ nullable: true }),
    __metadata("design:type", Object)
], TokenUri.prototype, "name", void 0);
__decorate([
    (0, typeorm_store_1.StringColumn)({ nullable: true }),
    __metadata("design:type", Object)
], TokenUri.prototype, "description", void 0);
__decorate([
    (0, typeorm_store_1.StringColumn)({ nullable: true }),
    __metadata("design:type", Object)
], TokenUri.prototype, "image", void 0);
__decorate([
    (0, typeorm_store_1.Column)("jsonb", { transformer: { to: obj => obj == null ? undefined : obj.map((val) => val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => new _attribute_1.Attribute(undefined, marshal.nonNull(val))) }, nullable: true }),
    __metadata("design:type", Object)
], TokenUri.prototype, "attributes", void 0);
__decorate([
    (0, typeorm_store_1.DateTimeColumn)({ nullable: true }),
    __metadata("design:type", Object)
], TokenUri.prototype, "fetched", void 0);
__decorate([
    (0, typeorm_store_1.OneToMany)(() => metadata_model_1.Metadata, e => e.tokenUri),
    __metadata("design:type", Array)
], TokenUri.prototype, "metadata", void 0);
exports.TokenUri = TokenUri = __decorate([
    (0, typeorm_store_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], TokenUri);
//# sourceMappingURL=tokenUri.model.js.map