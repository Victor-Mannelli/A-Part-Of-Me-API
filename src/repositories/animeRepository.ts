import { PrismaClient } from '@prisma/client';
import { UserAnimeStatus } from '../utils/types';

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function populateAnimeTable(animeData: any) {
  await prisma.anime.upsert({
    where: {
      anime_id: animeData.id
    },
    update: {
      anime_id: animeData.id,
      title: animeData.title,
      status: animeData.status,
      description: animeData.description,
      start_date: animeData.startDate,
      end_date: animeData.endDate,
      episodes: animeData.episodes,
      chapters: animeData.chapters,
      volumes: animeData.volumes,
      cover_image: animeData.coverImage.extraLarge,
      banner_image: animeData.bannerImage,
      genres: animeData.genres,
      average_score: animeData.averageScore,
      next_airing_episode: animeData.nextAiringEpisode
    },
    create: {
      anime_id: animeData.id,
      title: animeData.title,
      status: animeData.status,
      description: animeData.description,
      start_date: animeData.startDate,
      end_date: animeData.endDate,
      episodes: animeData.episodes,
      chapters: animeData.chapters,
      volumes: animeData.volumes,
      cover_image: animeData.coverImage.extraLarge,
      banner_image: animeData.bannerImage,
      genres: animeData.genres,
      average_score: animeData.averageScore,
      next_airing_episode: animeData.nextAiringEpisode
    }
  });
}

export async function postAnimeStatusForUser({
  userId,
  animeId,
  status,
  score,
  progress,
  rewatches,
  startDate,
  finishDate,
  favorite
}: UserAnimeStatus) {

  await prisma.userAnimeList.upsert({
    where: {
      user_id_anime_id: {
        user_id: userId,
        anime_id: animeId
      }
    },
    update: {
      status,
      score,
      progress,
      rewatches,
      start_date: startDate,
      finish_date: finishDate,
      favorite
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
      favorite
    }
  });
}

export async function findManyUserAnimeList(userId: number) {
  return await prisma.userAnimeList.findMany({
    where: {
      user_id: userId
    },
    include: {
      anime: true
    }
  });
}
