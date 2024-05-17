import { PrismaClient, UserAnimeList } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { prisma } from 'src/utils';

@Injectable()
export class AnimelistRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  async findOne(userId: number) {
    return await prisma.userAnimeList.findMany({
      where: {
        user_id: userId,
      },
      include: {
        anime: true,
      },
    });
  }

  async postUsersAnimesStatus(userAnimeStatus: UserAnimeList) {
    await prisma.userAnimeList.upsert({
      where: {
        user_id_anime_id: {
          user_id: userAnimeStatus.user_id,
          anime_id: userAnimeStatus.anime_id,
        },
      },
      update: {
        status: userAnimeStatus.status,
        score: userAnimeStatus.score,
        progress: userAnimeStatus.progress,
        rewatches: userAnimeStatus.rewatches,
        start_date: userAnimeStatus.start_date,
        finish_date: userAnimeStatus.finish_date,
        favorite: userAnimeStatus.favorite,
      },
      create: {
        user_id: userAnimeStatus.user_id,
        anime_id: userAnimeStatus.anime_id,
        status: userAnimeStatus.status,
        score: userAnimeStatus.score,
        progress: userAnimeStatus.progress,
        rewatches: userAnimeStatus.rewatches,
        start_date: userAnimeStatus.start_date,
        finish_date: userAnimeStatus.finish_date,
        favorite: userAnimeStatus.favorite,
      },
    });
  }

  async patchUserProgress(userId: number, animeId: number, progress: number) {
    await prisma.userAnimeList.update({
      where: {
        user_id_anime_id: {
          user_id: userId,
          anime_id: animeId,
        },
      },
      data: {
        progress,
      },
    });
  }

  async deleteAnimeFromList(userId: number, animeId: number) {
    await prisma.userAnimeList.delete({
      where: {
        user_id_anime_id: {
          user_id: userId,
          anime_id: animeId,
        },
      },
    });
  }
}
