import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FAVORIS } from 'src/data/favoris';
import { Favoris } from './favoris.types';
import { Observable } from 'rxjs';
import { FavorisService } from './favoris.service';
import { CreateFavoriDto } from './dto/create-favori.dto';

@Controller('favoris')
export class FavorisController {

    constructor(private readonly _favorisService: FavorisService) {}
    @Get()
    findAll(): Observable<Favoris[]> {
        return this._favorisService.findAll();
    }


    @Post() 
    create(@Body() createFavorisDto: CreateFavoriDto ): Observable<Favoris>{    
        return this._favorisService.create(createFavorisDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<void> {
        return this._favorisService.delete(id)
    }
}
