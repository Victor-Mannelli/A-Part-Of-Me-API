import { AnimelistRepository } from '../animelist/animelist.repository';
import { AnimelistService } from '../animelist/animelist.service';
import { AnimesRepository } from './animes.repository';
import { HttpCode, Injectable } from '@nestjs/common';
import { AnimeData } from 'src/utils';

@Injectable()
export class AnimesService {
  constructor(
    readonly animesRepository: AnimesRepository,
    readonly animelistService: AnimelistService,
  ) { }

  async findOne({ anime_id, user_id }: { anime_id: number, user_id: number }) {
    const userAnimelist = await this.animelistService.findOne(user_id);

    if (userAnimelist.find((e) => e.anime_id === anime_id)) {
      return await this.animesRepository.findOne({ anime_id, user_id });
    }
    return await this.animesRepository.findOne({ anime_id });
  }

  async populateAnimeTable(animeData: AnimeData) {
    try {
      const response = await this.animesRepository.findOne({ anime_id: animeData.id });
      if (response) return;
      return await this.animesRepository.populateAnimeTable(animeData);
    } catch (error) {
      console.log(error);
      throw HttpCode(400);
    }
  }
}
