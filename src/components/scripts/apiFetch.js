async function apiFetch(route, key, uris) {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: key },
    mode: "cors",
  };
  let ballChasingRoute =
    "https://safe-plateau-49424.herokuapp.com/https://ballchasing.com/api/";
  let fetchRoute = ballChasingRoute;
  //check route and apend

  //fetch json
  fetchRoute += uris;
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

export { fetchGame, fetchPing, fetchListOfGames };
