import { z } from 'zod/v4';

const usernameSchema = z.string({ error: 'Username must be a string.' });
const emailSchema = z.string({ error: 'Please provide a valid email address.' });
const passwordSchema = z
  .string({ error: 'Password must be a string.' })
  .min(6, { error: 'Password must be at least 6 characters long.' });

export const registrationSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

export const loginSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

export type RegistrationSchema = z.infer<typeof registrationSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
