import { z } from 'zod';

export const UserAnimeStatusSchema = z.object({
  animeId: z.number(),
  status: z.string(),
  score: z.number().optional(),
  progress: z.number().optional(),
  rewatches: z.number().optional(),
  startDate: z.string().optional(),
  finishDate: z.string().optional(),
  favorite: z.boolean().optional(),
});

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
