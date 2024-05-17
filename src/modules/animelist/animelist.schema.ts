import { z } from 'zod';

export const UpdateAnimeStatusSchema = z.object({
  animeId: z.number(),
  status: z.string(),
  score: z.number(),
  progress: z.number(),
  rewatches: z.number(),
  startDate: z.string(),
  finishDate: z.string().nullable(),
  favorite: z.boolean(),
});

export const UserAnimeStatusSchema = z.object({
  userId: z.string(),
  animeId: z.number(),
  status: z.string(),
  score: z.number(),
  progress: z.number(),
  rewatches: z.number(),
  startDate: z.string(),
  finishDate: z.string().optional(),
  favorite: z.boolean(),
});
