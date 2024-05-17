import { AnimelistRepository } from './animelist.repository';
import { Injectable } from '@nestjs/common';
// import { UserAnimeStatusDto } from './animes.dto';

@Injectable()
export class AnimelistService {
  constructor(readonly animelistRepository: AnimelistRepository) {}

  async findOne(userId: number) {
    return await this.animelistRepository.findOne(userId);
  }

  // async populateUserAnimelist(userAnimeStatus: UserAnimeStatusDto) {
  async populateUserAnimelist(userAnimeStatus: any) {
    return await this.animelistRepository.postUsersAnimesStatus(
      userAnimeStatus,
    );
  }
  // create(createAnimelistDto: any) {
  //   return 'This action adds a new animelist';
  // }

  // update(id: number, updateAnimelistDto: any) {
  //   return `This action updates a #${id} animelist`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} animelist`;
  // }

  // async updateAnimeProgress(userId: number, animeId: number, progress: number) {
  //   await this.animesRepository.patchAnimeProgress(userId, animeId, progress);
  // }
}
