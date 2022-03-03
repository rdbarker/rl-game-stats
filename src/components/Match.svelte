<script>
  import { ballchasingApi } from "../scripts/store/stores";
  import { createMatchStats } from "../scripts/models/match";
  import TimeHeader from "./match/TimeHeader.svelte";
  import TeamStatTable from "./match/TeamStatTable.svelte";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  export let matchId;

  let matchStats = null;
  ballchasingApi.getMatch((value) => {
    matchStats = createMatchStats(value);
  }, matchId);
</script>

{#if matchStats}
  <div transition:slide={{ delay: 250, duration: 400, easing: quintOut }}>
    <TimeHeader timeString={matchStats.date} />

    <TeamStatTable teamStats={matchStats.teams[0]} />
  </div>
{/if}

<style>
  div {
    border-top: 1px solid #5a5a5a;
    height: 230px;
    margin-top: 24px;
  }
</style>
