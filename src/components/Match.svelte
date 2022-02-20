<script>
  import TimeHeader from "./match/TimeHeader.svelte";
  import TeamTable from "./match/TeamTable.svelte";

  export let gameData = {};
  let isDataLoaded = false;
  let gameStats = {};

  $: if (gameData.status === "ok") {
    isDataLoaded = true;
    buildGameStats();
    console.log(gameStats);
  }

  function buildGameStats() {
    gameStats = {
      date: gameData.date,
      map: gameData.map_code,
      matchType: gameData.match_type,
      teamSize: gameData.team_size,
      winningTeam: findWinningTeam(),
      yourTeam: findYourTeam(),
      teams: buildTeams(findWinningTeam()),
    };
  }
  function findWinningTeam() {
    return gameData.blue.stats.core.goals > gameData.orange.stats.core.goals
      ? "blue"
      : "orange";
  }
  function findYourTeam() {
    let isPlayerOrange = gameData.orange.players
      .map((player) => player.id.id)
      .includes(gameData.uploader.steam_id);
    return isPlayerOrange ? "orange" : "blue";
  }
  function buildTeams(winningTeam) {
    return winningTeam === "blue"
      ? [buildTeamStats("blue"), buildTeamStats("orange")]
      : [buildTeamStats("orange"), buildTeamStats("blue")];
  }
  function buildTeamStats(teamColor) {
    return {
      color: teamColor,
      goals: gameData[teamColor].stats.core.goals,
      shots: gameData[teamColor].stats.core.shots,
      saves: gameData[teamColor].stats.core.saves,
      players: buildPlayers(teamColor),
    };
  }
  function buildPlayers(teamColor) {
    return gameData[teamColor].players.map((player) => {
      return {
        name: player.name,
        platform: player.id.platform,
        id: player.id.id,
        stats: {
          score: player.stats.core.score,
          goals: player.stats.core.goals,
          shots: player.stats.core.shots,
          assists: player.stats.core.assists,
          saves: player.stats.core.saves,
          shotPercentage: player.stats.core.shooting_percentage,
          demos: player.stats.demo.inflicted,
        },
      };
    });
  }
</script>

<div>
  {#if isDataLoaded}
    <h5><TimeHeader timeString={gameData.date} /></h5>
    <TeamTable teamStats={gameStats.teams[0]} />
    <TeamTable teamStats={gameStats.teams[1]} />
  {:else}
    loading...
  {/if}
</div>

<style>
  div {
    border: 2px solid #d4d4d4;
    margin: 16px;
    background: #202020;
    border-radius: 10px;
  }
</style>
