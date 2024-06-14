import { z } from 'zod';

const UserSchema = z.object({
  username: z.string(),
  avatar: z.string(),
});

export const MessageSchema = z.object({
  message_id: z.string(),
  message: z.string(),
  author_id: z.string(),
  author: UserSchema.optional(),
  receiver_id: z.string(),
  created_at: z.string(),
});
