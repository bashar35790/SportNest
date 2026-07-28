export const SPORT_TYPES = [
  "Football", "Badminton", "Basketball", "Volleyball",
  "Tennis", "Swimming", "Cricket", "Gym",
] as const;

export type SportType = (typeof SPORT_TYPES)[number];
