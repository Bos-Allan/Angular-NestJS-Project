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
exports.FavorisController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const favoris_service_1 = require("./favoris.service");
const create_favori_dto_1 = require("./dto/create-favori.dto");
let FavorisController = class FavorisController {
    constructor(_favorisService) {
        this._favorisService = _favorisService;
    }
    findAll() {
        return this._favorisService.findAll();
    }
    create(createFavorisDto) {
        return this._favorisService.create(createFavorisDto);
    }
    delete(id) {
        return this._favorisService.delete(id);
    }
};
exports.FavorisController = FavorisController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], FavorisController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_favori_dto_1.CreateFavoriDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], FavorisController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], FavorisController.prototype, "delete", null);
exports.FavorisController = FavorisController = __decorate([
    (0, common_1.Controller)('favoris'),
    __metadata("design:paramtypes", [favoris_service_1.FavorisService])
], FavorisController);
//# sourceMappingURL=favoris.controller.js.map