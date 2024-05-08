import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});
export const LoginSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export const UpdateUserSchema = z.object({
  userId: z.string(),
  newPassword: z.boolean().optional(),
});
