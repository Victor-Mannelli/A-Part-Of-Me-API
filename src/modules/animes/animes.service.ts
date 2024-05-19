import { AnimesRepository } from './animes.repository';
import { HttpCode, Injectable } from '@nestjs/common';
import { AnimeData } from 'src/utils';

@Injectable()
export class AnimesService {
  constructor(readonly animesRepository: AnimesRepository) {}

  async findOne(anime_id: string) {
    return await this.animesRepository.findOne(+anime_id);
  }

  async populateAnimeTable(animeData: AnimeData) {
    try {
      const response = await this.animesRepository.findOne(animeData.id);
      if (response) return;
      return await this.animesRepository.populateAnimeTable(animeData);
    } catch (error) {
      console.log(error);
      throw HttpCode(400);      
    }
  }
}
