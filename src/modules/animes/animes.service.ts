import { AnimeData, UserAnimeStatus } from 'src/utils';
import { AnimesRepository } from './animes.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnimesService {
  constructor(readonly animesRepository: AnimesRepository) {}
  // create(createAnimeDto: CreateAnimeDto) {
  //   return 'This action adds a new anime';
  // }
  // findAll() {
  //   return `This action returns all animes`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} anime`;
  // }
  // update(id: number, updateAnimeDto: UpdateAnimeDto) {
  //   return `This action updates a #${id} anime`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} anime`;
  // }
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
  async getUserAnimeList(userId: number) {
    return await this.animesRepository.findManyUserAnimeList(userId);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async populateAnimeTable(animeData: AnimeData) {
    await this.animesRepository.populateAnimeTable(animeData);
  }

  async updateAnimeProgress(userId: number, animeId: number, progress: number) {
    await this.animesRepository.putAnimeProgress(userId, animeId, progress);
  }
}
