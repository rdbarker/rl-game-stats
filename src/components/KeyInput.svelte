<script>
    export let apiKey = "";

    if (localStorage.getItem("ballchasing")){
        apiKey = localStorage.getItem("ballchasing");
    }

    $:localStorage.setItem("ballchasing", apiKey);
</script>

<input bind:value={apiKey} placeholder="ballchasing api key"> 