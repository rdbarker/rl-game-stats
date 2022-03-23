<script>
  import KeyInput from "./components/KeyInput.svelte";
  import MatchesList from "./components/MatchesList.svelte";
  import axios from "axios";

  async function getUser() {
    try {
      const response = await axios.get(
        "https://api.tracker.gg/api/v2/rocket-league/standard/profile/xbl/Deadshot%20Datboi"
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function g() {
    try {
      const r = await fetch(
        "https://api.tracker.gg/api/v2/rocket-league/standard/profile/steam/76561198031153890",
        {
          method: "GET",
          mode: "no-cors",
        }
      );
      console.log(r);
    } catch (err) {
      console.log(err);
    }
  }

  getUser();
</script>

<div />

<style>
  div {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
