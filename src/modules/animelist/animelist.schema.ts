import { z } from 'zod';

export const UserAnimeStatusSchema = z.object({
  anime_id: z.number(),
  status: z.string(),
  score: z.number().optional(),
  progress: z.number().optional(),
  rewatches: z.number().optional(),
  start_date: z.string(),
  finish_date: z.string().optional(),
  favorite: z.boolean().optional(),
});

// export const UpdateAnimeStatusSchema = z.object({
//   animeId: z.number(),
//   status: z.string(),
//   score: z.number().optional(),
//   progress: z.number().optional(),
//   rewatches: z.number().optional(),
//   startDate: z.string().optional(),
//   finishDate: z.string().nullable().optional(),
//   favorite: z.boolean().optional(),
// });
