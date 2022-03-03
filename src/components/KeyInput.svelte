<script>
  import { apiKey, isKeyVerified } from "../scripts/store/stores.js";
  const iconStatus = {
    true: { src: "icon-checkmark", color: "#74d978" },
    false: { src: "icon-x", color: "#e75c5c" },
    undefined: { src: "icon-x", color: "#e75c5c" },
  };
</script>

<input bind:value={$apiKey} placeholder="ballchasing api key" />
<span
  class={iconStatus[$isKeyVerified]["src"]}
  style="color:{iconStatus[$isKeyVerified]['color']}"
/>

<style>
  input {
    min-width: 24em;
  }
</style>
