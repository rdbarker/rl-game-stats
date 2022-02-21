<script>
  //background-color: #515a64;
  import { userId, activeTeamStats } from "../../scripts/stores.js";
  import {
    parseTableHeader,
    parseTableData,
  } from "../../scripts/stringHelpers";

  export let teamStats;
  function isYou(idToCheck) {
    return $userId === idToCheck ? "you" : "";
  }
</script>

<table class={teamStats.color}>
  <tr>
    <th>{teamStats.goals}</th>
    {#each $activeTeamStats as stat}
      <th>{parseTableHeader(stat)}</th>
    {/each}
  </tr>
  {#each teamStats.players as player}
    <tr class={isYou(player.id)}>
      <td>{player.name}</td>

      {#each $activeTeamStats as stat}
        <td>
          {parseTableData(player.stats[stat], stat)}
        </td>
      {/each}
    </tr>
  {/each}
</table>

<style>
  table {
    border-collapse: collapse;
    margin: 2em 1em;
    table-layout: fixed;
  }
  .orange tr.you {
    color: rgb(248, 197, 101);
  }
  .blue tr.you {
    color: rgb(133, 161, 255);
  }
  .orange th:first-of-type {
    color: rgb(248, 197, 101);
  }
  .blue th:first-of-type {
    color: rgb(133, 161, 255);
  }
  .orange th {
    border-bottom: 4px solid rgb(248, 197, 101);
  }
  .blue th {
    border-bottom: 4px solid rgb(133, 161, 255);
  }
  th:first-of-type {
    font-size: 2em;
    text-align: right;
    width: 8ch;
  }
  th {
    width: 3.5em;
    text-align: center;
    vertical-align: bottom;
  }
  td {
    text-align: center;
  }
  td:first-child {
    text-align: right;
  }
</style>
