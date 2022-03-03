//routes are replays and stats

const composeRequestOptions = (key) => {
  let requestOptions = {
    method: "GET",
    mode: "cors",
  };
  if (key.length > 0) {
    requestOptions.headers = { Authorization: key };
  }
  return requestOptions;
};

export const fetchFromApi = async (route, keyFunctionOrValue = "") => {
  const key = retrieveKey(keyFunctionOrValue);
  const fetchOptions = composeRequestOptions(key);
  const response = await fetch(route, fetchOptions);
  if (response.ok) {
    return await response.json();
  } else {
    return false;
  }
};

const retrieveKey = (keyFunctionOrValue) => {
  if (typeof keyFunctionOrValue === "function") {
    return keyFunctionOrValue();
  } else if (keyFunctionOrValue != null) {
    return keyFunctionOrValue;
  } else return "";
};

const composeRoute = (route, uris) => {
  let routeString = "";
  if (route === "replays") {
    routeString =
      "https://safe-plateau-49424.herokuapp.com/https://ballchasing.com/api";
  } else if (route === "stats") {
    routeString =
      "https://api.tracker.gg/api/v2/rocket-league/standard/profile";
  }
  return routeString + "/" + encodeURIComponent(uris);
};

export const fetchCheckKey = (key) => {
  return fetchFromApi("replays", key);
};
export const fetchListOfMatches = async (key, maxCount = 15) => {
  return await fetchFromApi(
    "replays",
    key,
    `replays/?uploader=me&count=${maxCount}`
  );
};
export const fetchMatch = async (key, matchId) => {
  return await fetchFromApi("replays", key, `replays/${matchId}`);
};
export const fetchRanks = async (profileName, profileId, platform) => {
  const platforms = {
    steam: "steam",
    xbox: "xbl",
    ps4: "psn",
    epic: "epic",
    psynet: "switch",
  };
  const profileValue = platform === "steam" ? profileId : profileName;
  return await fetchFromApi(
    "stats",
    null,
    `${platforms[platform]}/${profileValue}`
  );
};
