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
    const end_date =
      animeData.endDate.year === null ||
      animeData.endDate.month === null ||
      animeData.endDate.day === null
        ? null
        : Math.round(
            new Date(
              animeData.endDate.year,
              animeData.endDate.month - 1,
              animeData.endDate.day,
            ).getTime() / 1000,
          );

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
        end_date,
        episodes: animeData.episodes,
        tags: animeData.tags.map((e) => e.name),
        trailer_id: animeData.trailer.id,
        trailer_site: animeData.trailer.site,
        trailer_thumbnail: animeData.trailer.thumbnail,
        chapters: animeData.chapters,
        volumes: animeData.volumes,
        cover_image: animeData.coverImage.extraLarge,
        banner_image: animeData.bannerImage,
        genres: animeData.genres,
        average_score: animeData.averageScore,
        next_airing_episode: animeData.nextAiringEpisode,
        updated_at: Date.now().toString(),
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
        end_date,
        episodes: animeData.episodes,
        tags: animeData.tags.map((e) => e.name),
        trailer_id: animeData.trailer.id,
        trailer_site: animeData.trailer.site,
        trailer_thumbnail: animeData.trailer.thumbnail,
        chapters: animeData.chapters,
        volumes: animeData.volumes,
        cover_image: animeData.coverImage.extraLarge,
        banner_image: animeData.bannerImage,
        genres: animeData.genres,
        average_score: animeData.averageScore,
        next_airing_episode: animeData.nextAiringEpisode,
        updated_at: Date.now().toString(),
      },
    });
  }
}
