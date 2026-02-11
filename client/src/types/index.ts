export type Departures = {
  countdown: number | null;
  delay: string | null;
  date: string;
  destination: string;
  is_cancelled: number;
  key: string;
  line: string;
  platform: string;
  sched_date: string;
  sched_time: string;
  time: string;
  type: string;
};

export type Station = {
  id: string;
  cityName: string;
  stationName: string;
  searchCount: number;
};

export type Favorite = {
  id: string;
  userId: string;
  stationId: Station;
  nickname: string | null;
};

export type User = {
  id: string;
  username: string;
  email: string;
};
