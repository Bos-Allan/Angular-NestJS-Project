import { Observable } from 'rxjs';
import { CreateFavoriDto } from './dto/create-favori.dto';
export declare class FavorisService {
    findAll(): Observable<CreateFavoriDto[]>;
    create(favoris: CreateFavoriDto): Observable<CreateFavoriDto>;
    delete(id: string): Observable<void>;
}
