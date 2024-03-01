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

  async findOneAnime(animeId: number) {
    return await prisma.anime.findFirst({
      where: {
        anime_id: animeId,
      },
    });
  }

  async findUserAnimeList(userId: number) {
    return await prisma.userAnimeList.findMany({
      where: {
        user_id: userId,
      },
      include: {
        anime: true,
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async populateAnimeTable(animeData: types.AnimeData) {
    await prisma.anime.upsert({
      where: {
        anime_id: animeData.id,
      },
      update: {
        anime_id: animeData.id,
        title: animeData.title.romaji,
        status: animeData.status,
        description: animeData.description,
        start_date: Math.round(
          new Date(
            animeData.startDate.year,
            animeData.startDate.month - 1,
            animeData.startDate.day,
          ).getTime() / 1000,
        ),
        end_date: Math.round(
          new Date(
            animeData.endDate.year,
            animeData.endDate.month - 1,
            animeData.endDate.day,
          ).getTime() / 1000,
        ),
        episodes: animeData.episodes,
        chapters: animeData.chapters,
        volumes: animeData.volumes,
        cover_image: animeData.coverImage.extraLarge,
        banner_image: animeData.bannerImage,
        genres: animeData.genres,
        average_score: animeData.averageScore,
        next_airing_episode: animeData.nextAiringEpisode,
      },
      create: {
        anime_id: animeData.id,
        title: animeData.title.romaji,
        status: animeData.status,
        description: animeData.description,
        start_date: Math.round(
          new Date(
            animeData.startDate.year,
            animeData.startDate.month - 1,
            animeData.startDate.day,
          ).getTime() / 1000,
        ),
        end_date: Math.round(
          new Date(
            animeData.endDate.year,
            animeData.endDate.month - 1,
            animeData.endDate.day,
          ).getTime() / 1000,
        ),
        episodes: animeData.episodes,
        chapters: animeData.chapters,
        volumes: animeData.volumes,
        cover_image: animeData.coverImage.extraLarge,
        banner_image: animeData.bannerImage,
        genres: animeData.genres,
        average_score: animeData.averageScore,
        next_airing_episode: animeData.nextAiringEpisode,
      },
    });
  }

  async postAnimeStatusForUser({
    userId,
    animeId,
    status,
    score,
    progress,
    rewatches,
    startDate,
    finishDate,
    favorite,
  }: types.UserAnimeStatus) {
    await prisma.userAnimeList.upsert({
      where: {
        user_id_anime_id: {
          user_id: userId,
          anime_id: animeId,
        },
      },
      update: {
        status,
        score,
        progress,
        rewatches,
        start_date: startDate,
        finish_date: finishDate,
        favorite,
      },
      create: {
        user_id: userId,
        anime_id: animeId,
        status,
        score,
        progress,
        rewatches,
        start_date: startDate,
        finish_date: finishDate,
        favorite,
      },
    });
  }

  async putAnimeProgress(userId: number, animeId: number, progress: number) {
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
}
