import { Favoris } from './favoris.types';
import { Observable } from 'rxjs';
import { FavorisService } from './favoris.service';
import { CreateFavoriDto } from './dto/create-favori.dto';
export declare class FavorisController {
    private readonly _favorisService;
    constructor(_favorisService: FavorisService);
    findAll(): Observable<Favoris[]>;
    create(createFavorisDto: CreateFavoriDto): Observable<Favoris>;
    delete(id: string): Observable<void>;
}
