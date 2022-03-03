<script>
  import { ballchasingApi } from "../scripts/store/stores";
  import { createMatches } from "../scripts/models/matches";
  import Match from "./Match.svelte";

  let matches = new Map();
  ballchasingApi.getMatches((value) => {
    matches = createMatches(value, matches);
  });
</script>

<div>
  {#each [...matches] as [matchId, matchBasicStats] (matchId)}
    <Match {matchId} />
  {/each}
</div>
