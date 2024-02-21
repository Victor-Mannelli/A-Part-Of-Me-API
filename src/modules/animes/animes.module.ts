import { AnimesController } from './animes.controller';
import { AnimesRepository } from './animes.repository';
import { AnimesService } from './animes.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AnimesController],
  providers: [AnimesService, AnimesRepository],
})
export class AnimesModule {}
