import { AnimelistController } from './animelist.controller';
import { AnimelistRepository } from './animelist.repository';
import { AnimelistService } from './animelist.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AnimelistController],
  providers: [AnimelistService, AnimelistRepository],
  exports: [AnimelistService],
})
export class AnimelistModule {}
