async function apiFetch(route, key, uris) {
  let requestOptions = {
    method: "GET",
    headers: { Authorization: key },
    mode: "cors",
  };
  let ballChasingRoute =
    "https://safe-plateau-49424.herokuapp.com/https://ballchasing.com/api/";
  let statsRoute =
    "https://api.tracker.gg/api/v2/rocket-league/standard/profile/";
  let fetchRoute = ballChasingRoute;
  //check route and apend
  if (route === "stats") {
    fetchRoute = statsRoute;
    requestOptions = {
      method: "GET",
      mode: "cors",
    };
  }

  //fetch json
  if (uris) fetchRoute += uris;
  let response = await fetch(fetchRoute, requestOptions);
  let text = await response.json();
  if (response.ok) {
    return text;
  } else {
    return false;
  }
}

async function fetchGame(key, gameId) {
  let uris = "replays/" + gameId;
  return apiFetch("bc", key, uris);
}

async function fetchPing(key) {
  return apiFetch("bc", key, "");
}

async function fetchListOfGames(key, maxCount = 15, startDate) {
  let uris = `replays/?uploader=me&count=${maxCount}`;
  return apiFetch("bc", key, uris);
}

async function fetchStats(profileName, profileId, platform) {
  //bc : rltracker
  const platforms = {
    steam: "steam",
    xbox: "xbl",
    ps4: "psn",
    epic: "epic",
    psynet: "switch",
  };
  const profileValue = platform === "steam" ? profileId : profileName;
  const uris = encodeURIComponent(platforms[platform] + "/" + profileValue);
  return apiFetch("stats", null, uris);
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export { fetchGame, fetchPing, fetchListOfGames, fetchStats, delay };
