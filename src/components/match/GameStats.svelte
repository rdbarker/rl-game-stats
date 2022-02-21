<script>
  import { activeGameStats } from "../../scripts/stores.js";
  import { parseTableHeader } from "../../scripts/stringHelpers";
  import StatsBar from "./StatsBar.svelte";
  export let gameStats = {};
</script>

<div>
  {#each $activeGameStats as stat}
    <StatsBar
      leftColor={gameStats.teams[0].color}
      leftValue={gameStats.teams[0][stat]}
      rightValue={gameStats.teams[1][stat]}
      statName={parseTableHeader(stat)}
    />
  {/each}
</div>
