import { Types } from 'mongoose';
import { z } from 'zod/v4';

export const favoriteSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  userId: z.string({ error: 'user_id is required' }).min(1, { error: 'user_id must not be empty' }),

  stationId: z
    .string({ error: 'Station Id is required' })
    .min(1, { error: 'station id must not be empty' }),
  nickname: z.string().trim().optional(),
  order: z.number().int().optional(),
  lastAccessed: z.date().optional(),
});
export const deleteFavoriteSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  user_id: z
    .string({ error: 'user_id is required' })
    .min(1, { error: 'user_id must not be empty' }),
  stationId: z
    .string({ error: 'station id is required' })
    .min(1, { error: 'station id must not be empty' }),
});

export type FavoriteSchema = z.infer<typeof favoriteSchema>;
