// import { findManyUserAnimeList, populateAnimeTable, postAnimeStatusForUser } from '../repositories';
import { findManyUserAnimeList, populateAnimeTable, postAnimeStatusForUser } from '../repositories';
import { UserAnimeStatus } from '../utils/types';

export async function postAnimeStatusService({
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
  await postAnimeStatusForUser({
    userId,
    animeId,
    status,
    score,
    progress,
    rewatches,
    startDate,
    finishDate,
    favorite
  });
}
export async function getUserAnimeListService(userId: number) {
  return await findManyUserAnimeList(userId);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function populateAnimeTableService(animeData: any) {
  return await populateAnimeTable(animeData);
}
