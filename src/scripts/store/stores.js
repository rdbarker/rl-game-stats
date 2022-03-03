import { writable, readable, derived } from "svelte/store";
import { storeItem, getItem } from "../lib/localStorage";
import { BallchasingApi } from "../apiManager/BallchasingApi";

const BALLCHASING_STORAGE_KEY = "bckey";
const PLAYER_STATS = new Map([
  ["Score", "score"],
  ["Goals", "goals"],
  ["Shots", "shots"],
  ["Shot%", "shotPercentage"],
  ["Assists", "assists"],
  ["Saves", "saves"],
  ["Demos", "demos"],
]);

export const totalAvailblePlayerStats = readable(PLAYER_STATS);

export const activeStats = writable(Array.from(PLAYER_STATS.keys()));

export const apiKey = writable("");
apiKey.set(getItem(BALLCHASING_STORAGE_KEY));

export const ballchasingApi = BallchasingApi(apiKey, 60);

export const isKeyVerified = derived(
  apiKey,
  ($apiKey, set) => {
    if ($apiKey.length > 39) {
      ballchasingApi.start();
      ballchasingApi.checkKey((value) => {
        const isNewKeyVerified = value["chaser"] ? true : false;
        if (isNewKeyVerified) storeItem(BALLCHASING_STORAGE_KEY, $apiKey);
        else ballchasingApi.pause();
        set(isNewKeyVerified);
      });
    } else {
      ballchasingApi.pause();
    }
  },
  false
);
