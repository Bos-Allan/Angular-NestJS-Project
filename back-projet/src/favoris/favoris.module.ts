import { Logger, Module } from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { FavorisController } from './favoris.controller';

@Module({
  providers: [FavorisService , Logger],
  controllers: [FavorisController]
})
export class FavorisModule {}
