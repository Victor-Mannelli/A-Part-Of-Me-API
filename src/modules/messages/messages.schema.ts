import { z } from 'zod';

const UserSchema = z.object({
  username: z.string(),
  avatar: z.string().nullable(),
});

export const MessageSchema = z.object({
  message_id: z.string(),
  message: z.string(),
  author_id: z.string(),
  author: UserSchema.optional(),
  created_at: z.string(),
});
