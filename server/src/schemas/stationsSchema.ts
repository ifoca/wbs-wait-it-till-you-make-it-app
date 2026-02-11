import { Types } from 'mongoose';
import { z } from 'zod/v4';

export const stationsSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  cityName: z
    .string({ error: 'cityName is required' })
    .min(1, { message: 'Name needs to have at least 1 character' }),
  stationName: z
    .string({ error: 'stationName is required' })
    .min(1, { message: 'Name needs to have at least 1 character' }),
  cityNameNormalized: z.string(),
  stationNameNormalized: z.string(),
  searchCount: z.number(),
  isVerified: z.boolean(),
  aliasNames: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const stationInputSchema = z
  .object({
    cityName: z
      .string({ error: 'cityName is required' })
      .min(2, { error: ' name needs to have at least 2 characters' }),
    stationName: z
      .string({ error: 'stationName is required' })
      .min(2, { error: ' name needs to have at least 2 characters' }),
    cityNameNormalization: z.string().optional(),
    stationNameNormalization: z.string().optional(),
    aliasNames: z.array(z.string()).optional(),
    isVerified: z.boolean().optional(),
  })
  .strict();

export type StationsInputSchema = z.infer<typeof stationInputSchema>;
export type StationsSchema = z.infer<typeof stationsSchema>;
