<script>
import { onMount } from "svelte";

    import {fetchPing} from "./scripts/apiFetch"

    export let apiKey = "";
    export let keyVerified = false;

    let verifiedJson = {};
    let iconStatus = {
        true:{"src":"icon-checkmark", "color":"#74d978"}, 
        false:{"src":"icon-x", "color":"#e75c5c"},
        undefined: {"src":"icon-x", "color":"#e75c5c"}
    }

    $: localStorage.setItem("ballchasing", apiKey);
    if (localStorage.getItem("ballchasing")){
            apiKey = localStorage.getItem("ballchasing");
        }
    onMount(() =>{

            let promise = fetchPing(apiKey).then(
                value => {
                            verifiedJson = value;
                            keyVerified = verifiedJson["chaser"] ? true : false;
                        }
            );
    });

    

</script>
<div>
    <input bind:value={apiKey} placeholder="ballchasing api key"> 
    <span class="{iconStatus[keyVerified]["src"]}" style="color:{iconStatus[keyVerified]["color"]}"> </span>
</div>