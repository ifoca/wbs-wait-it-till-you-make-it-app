import { z } from 'zod';

const envSchema = z.object({
  SALT_ROUNDS: z.coerce.number().default(13),

  ACCESS_JWT_SECRET: z
    .string({
      error: 'ACCESS_JWT_SECRET is required and must be at least 64 characters long',
    })
    .min(64),
  CLIENT_BASE_URL: z.url().default('http://localhost:5173'),
  DEPARTURES_API: z.url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:\n', z.prettifyError(parsedEnv.error));
  process.exit(1);
}

export const { ACCESS_JWT_SECRET, CLIENT_BASE_URL, SALT_ROUNDS, DEPARTURES_API } = parsedEnv.data;
