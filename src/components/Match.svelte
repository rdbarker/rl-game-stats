<script>
    import TimeHeader from "./match/TimeHeader.svelte";
    
    export let gameData = {};
    
</script>



<style>
    div{
        width: 1200px;
        height: 120px;
        border: 2px solid darkslategrey;
        margin: 16px;
    }
</style>

<div>
   {#if gameData.status === "ok"}
        <TimeHeader timeString={gameData.date}/>
        {:else}
        loading...
    {/if}
</div>

