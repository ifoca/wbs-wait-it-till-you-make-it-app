export type Station = {
  key: string;
  is_cancelled: number;
  platform: string;
  line: string;
  destination: string;
  sched_time: string;
  delay: string | null;
  type: string;
};

export type DeparturesResponse = {
  error: string | null;
  preformatted: unknown[][];
  raw: Station[];
  version: string;
};
