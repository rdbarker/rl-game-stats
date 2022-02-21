<script>
  import MatchesList from "./components/MatchesList.svelte";
  import KeyInput from "./components/KeyInput.svelte";
  import StatsBar from "./components/match/StatsBar.svelte";
  //<KeyInput />
  //<MatchesList />
</script>

<div>
  <KeyInput />
  <MatchesList />
</div>

<style>
  div {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
