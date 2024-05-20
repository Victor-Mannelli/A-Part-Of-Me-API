import { AnimelistRepository } from '../animelist/animelist.repository';
import { AnimelistModule } from '../animelist/animelist.module';
import { AnimesController } from './animes.controller';
import { AnimesRepository } from './animes.repository';
import { AnimesService } from './animes.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [AnimelistModule],
  controllers: [AnimesController],
  providers: [AnimesService, AnimesRepository, AnimelistRepository],
})
export class AnimesModule {}
