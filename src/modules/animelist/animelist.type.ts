export type UpdateAnimeStatusType = {
  user_id: number;
  anime_id: number;
  status: string;
  score?: number;
  progress?: number;
  rewatches?: number;
  start_date: string;
  finish_date?: string;
  favorite?: boolean;
};
