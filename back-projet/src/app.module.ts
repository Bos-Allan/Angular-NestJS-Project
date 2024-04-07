import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { FavorisModule } from './favoris/favoris.module';


@Module({
  imports: [HelloModule, FavorisModule],
})
export class AppModule {}
