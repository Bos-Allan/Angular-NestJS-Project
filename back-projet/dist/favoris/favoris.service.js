"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavorisService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const favoris_1 = require("../data/favoris");
let FavorisService = class FavorisService {
    findAll() {
        return (0, rxjs_1.of)(favoris_1.FAVORIS);
    }
    create(favoris) {
        if (!favoris.id_favoris || !favoris.id_film) {
            throw new Error('id and photo are required');
        }
        if (favoris_1.FAVORIS.find(f => f.id_favoris === favoris.id_favoris)) {
            throw new Error('id already exists');
        }
        if (favoris_1.FAVORIS.find(f => f.id_film === favoris.id_film)) {
            throw new Error('Id film already exists');
        }
        favoris_1.FAVORIS.push(favoris);
        return (0, rxjs_1.of)(favoris);
    }
    delete(id) {
        const index = favoris_1.FAVORIS.findIndex(f => f.id_favoris === id);
        if (index === -1) {
            throw new Error(`Favori with id ${id} not found`);
        }
        favoris_1.FAVORIS.splice(index, 1);
        return (0, rxjs_1.of)(null);
    }
};
exports.FavorisService = FavorisService;
exports.FavorisService = FavorisService = __decorate([
    (0, common_1.Injectable)()
], FavorisService);
//# sourceMappingURL=favoris.service.js.map