import { apiQueue } from "./apiQueue";
import { fetchFromApi } from "./fetch";

export const BallchasingApi = (apiKeyStore, ticksPerMinute = 12) => {
  const API_BASE_URL =
    "https://safe-plateau-49424.herokuapp.com/https://ballchasing.com/api";

  const queue = apiQueue(ticksPerMinute);
  const start = queue.start;
  const pause = queue.pause;

  let apiKey = "";
  apiKeyStore.subscribe((value) => {
    apiKey = value;
  });
  const getKey = () => {
    return apiKey;
  };
  const checkKey = (setter) => {
    queue.add(fetchFromApi, [API_BASE_URL, getKey], setter, true, false);
  };
  const getMatches = (setter, maxCount = 15) => {
    const route = `${API_BASE_URL}/replays/?uploader=me&count=${maxCount}`;
    queue.add(fetchFromApi, [route, getKey], setter, false, true);
  };
  const getMatch = (setter, matchId) => {
    const route = `${API_BASE_URL}/replays/${matchId}`;
    queue.add(
      fetchFromApi,
      [route, getKey],
      setter,
      false,
      false,
      ticksPerMinute * 10
    );
  };

  return { checkKey, getMatches, getMatch, start, pause };
};
