import { UpdateAnimeStatusType } from './animelist.type';
import { Injectable } from '@nestjs/common';
import { prisma } from 'src/utils';

@Injectable()
export class AnimelistRepository {
  async findOne(userId: number) {
    return await prisma.userAnimeList.findMany({
      where: {
        user_id: userId,
      },
      include: {
        anime: {
          select: {
            cover_image: true,
            title: true,
          },
        },
      },
    });
  }

  async upsertUsersAnimesStatus(userAnimeStatus: any) {
    let updateObj: Omit<UpdateAnimeStatusType, 'user_id' | 'anime_id'>;
    let createObj: UpdateAnimeStatusType;

    for (const key in userAnimeStatus) {
      createObj = { ...createObj, [key]: userAnimeStatus[key] };
      if (key !== 'user_id' && key !== 'anime_id') {
        updateObj = { ...updateObj, [key]: userAnimeStatus[key] };
      }
    }
    return await prisma.userAnimeList.upsert({
      where: {
        user_id_anime_id: {
          user_id: userAnimeStatus.user_id,
          anime_id: userAnimeStatus.anime_id,
        },
      },
      update: updateObj,
      create: createObj,
    });
  }

  async patchUserProgress({ userId, animeId, progress }: {
    userId: number;
    animeId: number;
    progress: number;
  }) {
    return await prisma.userAnimeList.update({
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

  async deleteAnimeFromList({
    userId,
    animeId,
  }: {
    userId: number;
    animeId: number;
  }) {
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
