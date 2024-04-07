import { ConflictException, Injectable } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { FAVORIS } from 'src/data/favoris';
import { CreateFavoriDto } from './dto/create-favori.dto';
import { error } from 'console';

@Injectable()
export class FavorisService {

    findAll(): Observable<CreateFavoriDto[]> {
      return of(FAVORIS);
    }
  
    create(favoris: CreateFavoriDto): Observable<CreateFavoriDto> {
      if (!favoris.id_favoris || !favoris.id_film) {
        throw new Error('id and photo are required');
      }
      if (FAVORIS.find(f => f.id_favoris === favoris.id_favoris)) {
        // throw new ConflictException('id already exists');
        throw new Error('id already exists');
      }
  
      FAVORIS.push(favoris);
      return of(favoris);
    }

    delete(id: string): Observable<void> {
        const index = FAVORIS.findIndex(f => f.id_favoris === id);

        if(index === -1) {
            throw new error('id does not exist');
        }

        FAVORIS.splice(index, 1);
        return of();
    }

}