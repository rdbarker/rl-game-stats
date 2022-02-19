import { writable } from "svelte/store";

export const apiKey = writable("");
export const keyVerified = writable(false);
export const userId = writable(null);

export const activeTeamStats = writable([
  "score",
  "goals",
  "shots",
  "assists",
  "saves",
  "shotPercentage",
  "demos",
]);
