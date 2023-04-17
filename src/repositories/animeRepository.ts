import { prisma } from '../config/database';
import { AnimeData, UserAnimeStatus } from '../utils/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function populateAnimeTable(animeData: AnimeData) {
  await prisma.anime.upsert({
    where: {
      anime_id: animeData.id
    },
    update: {
      anime_id: animeData.id,
      title: animeData.title.romaji,
      status: animeData.status,
      description: animeData.description,
      start_date: Math.round(new Date(animeData.startDate.year, animeData.startDate.month - 1, animeData.startDate.day).getTime() / 1000),
      end_date: Math.round(new Date(animeData.endDate.year, animeData.endDate.month - 1, animeData.endDate.day).getTime() / 1000),
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
      title: animeData.title.romaji,
      status: animeData.status,
      description: animeData.description,
      start_date: Math.round(new Date(animeData.startDate.year, animeData.startDate.month - 1, animeData.startDate.day).getTime() / 1000),
      end_date: Math.round(new Date(animeData.endDate.year, animeData.endDate.month - 1, animeData.endDate.day).getTime() / 1000),
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

export async function putAnimeProgress(userId: number, animeId: number, progress: number) {
  await prisma.userAnimeList.update({
    where: {
      user_id_anime_id: {
        user_id: userId,
        anime_id: animeId
      }
    },
    data: {
      progress
    }
  });
}
