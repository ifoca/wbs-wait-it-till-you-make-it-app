import { z } from 'zod/v4';

const usernameSchema = z.string({ error: ' username must be a string' });
const emailSchema = z.string({ error: 'please input a valid  email' });
const passwordSchema = z
  .string({ error: 'password must be a string' })
  .min(6, { error: 'password must be at least 6 characters' });

export const registrationInputSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

export const loginInputSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

export type RegistrationInput = z.infer<typeof registrationInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
