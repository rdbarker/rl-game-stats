<script>
  import { fetchGame, fetchListOfGames, delay } from "../scripts/apiFetch";
  import Match from "./Match.svelte";
  import { apiKey, keyVerified } from "../scripts/stores.js";
  import { onMount } from "svelte";

  let time = new Date();
  let secondsBetweenRefresh = 10;
  let games = new Map();
  let instance;

  $: seconds = time.getSeconds();
  $: if (seconds % secondsBetweenRefresh == 0 && $keyVerified) refreshGames();
  $: console.log(instance);
  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  async function refreshGames() {
    let gamesList = await fetchListOfGames($apiKey, 15);
    gamesList.list.forEach((item) => {
      if (!games.has(item.id)) {
        games.set(item.id, {});
      }
    });

    for (const [gameDataId, gameData] of games) {
      if (gameData === false || !("status" in gameData)) {
        let currentMatch = await loadMatch(gameDataId);
        games.set(gameDataId, currentMatch);
        delay(500);
        games = sortGames(games);
      }
    }
  }

  async function loadMatch(gameId) {
    return await fetchGame($apiKey, gameId);
  }

  function sortGames(games) {
    return new Map(
      [...games].sort(([key1, value1], [key2, value2]) => {
        let entry1Date = new Date(value1.date);
        let entry2Date = new Date(value2.date);
        return entry2Date - entry1Date;
      })
    );
  }
</script>

<div>
  {#each [...games] as [gameId, stats] (gameId)}
    <Match gameData={stats} bind:this={instance} />
  {/each}
</div>
