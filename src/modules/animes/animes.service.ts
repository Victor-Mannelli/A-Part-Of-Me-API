import { AnimeData, UserAnimeStatus } from 'src/utils';
import { AnimesRepository } from './animes.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnimesService {
  constructor(readonly animesRepository: AnimesRepository) {}

  async getUserAnimeList(userId: number) {
    return await this.animesRepository.findUserAnimeList(userId);
  }

  async postAnimeStatus({
    userId,
    animeId,
    status,
    score,
    progress,
    rewatches,
    startDate,
    finishDate,
    favorite,
  }: UserAnimeStatus) {
    return await this.animesRepository.postAnimeStatusForUser({
      userId,
      animeId,
      status,
      score,
      progress,
      rewatches,
      startDate,
      finishDate,
      favorite,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async populateAnimeTable(animeData: AnimeData) {
    const response = await this.animesRepository.findOneAnime(animeData.id);
    if (response) return;
    return await this.animesRepository.populateAnimeTable(animeData);
  }

  async updateAnimeProgress(userId: number, animeId: number, progress: number) {
    await this.animesRepository.putAnimeProgress(userId, animeId, progress);
  }
}
