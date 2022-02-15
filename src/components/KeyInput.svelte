<script>
  import { fetchPing, delay } from "./scripts/apiFetch";
  import { apiKey, keyVerified } from "./scripts/stores.js";

  let iconStatus = {
    true: { src: "icon-checkmark", color: "#74d978" },
    false: { src: "icon-x", color: "#e75c5c" },
    undefined: { src: "icon-x", color: "#e75c5c" },
  };

  $: localStorage.setItem("ballchasing", $apiKey);
  if (localStorage.getItem("ballchasing")) {
    $apiKey = localStorage.getItem("ballchasing");
  }

  $: {
    fetchPing($apiKey).then((json) => {
      $keyVerified = json["chaser"];
      delay(1000);
    });
  }
</script>

<div>
  <input bind:value={$apiKey} placeholder="ballchasing api key" />
  <span
    class={iconStatus[$keyVerified]["src"]}
    style="color:{iconStatus[$keyVerified]['color']}"
  />
</div>

<style>
  input {
    min-width: 24em;
  }
</style>
