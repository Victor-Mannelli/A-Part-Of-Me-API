import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import * as types from 'src/utils/types';
import { prisma } from 'src/utils';

@Injectable()
export class AnimesRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  async findOne({ anime_id, user_id }: { anime_id: number; user_id?: number }) {
    return user_id
      ? await prisma.anime.findUnique({
          where: {
            anime_id,
          },
          include: {
            UserAnimeList: {
              where: {
                user_id,
              },
            },
          },
        })
      : await prisma.anime.findUnique({
          where: {
            anime_id,
          },
        });
  }

  async populateAnimeTable(animeData: types.AnimeData) {
    await prisma.anime.upsert({
      where: {
        anime_id: animeData.id,
      },
      update: {
        anime_id: animeData.id,
        title: animeData.title,
        status: animeData.status,
        description: animeData.description,
        startDate: animeData.startDate,
        endDate: animeData.endDate,
        episodes: animeData.episodes,
        tags: animeData.tags,
        trailer: animeData.trailer,
        chapters: animeData.chapters,
        volumes: animeData.volumes,
        coverImage: animeData.coverImage,
        bannerImage: animeData.bannerImage,
        genres: animeData.genres,
        averageScore: animeData.averageScore,
        nextAiringEpisode: animeData.nextAiringEpisode,
        updated_at: Date.now().toString(),
      },
      create: {
        anime_id: animeData.id,
        title: animeData.title,
        status: animeData.status,
        description: animeData.description,
        startDate: animeData.startDate,
        endDate: animeData.endDate,
        episodes: animeData.episodes,
        tags: animeData.tags,
        trailer: animeData.trailer,
        chapters: animeData.chapters,
        volumes: animeData.volumes,
        coverImage: animeData.coverImage,
        bannerImage: animeData.bannerImage,
        genres: animeData.genres,
        averageScore: animeData.averageScore,
        nextAiringEpisode: animeData.nextAiringEpisode,
        updated_at: Date.now().toString(),
      },
    });
  }
}
