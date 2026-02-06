export type { Station, DeparturesResponse } from './Departures.ts';

/* Global Express type augmentations used across the server */
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export {};
