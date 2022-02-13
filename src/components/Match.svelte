<script>
    import TimeHeader from "./match/TimeHeader.svelte";

    export let gameData = {};

</script>

<style>
    div{
        width: 1200px;
        height: 120px;
        border: 2px solid darkslategrey;
    }
</style>

<div>
    <h3>{gameData.team_size} vs {gameData.team_size}</h3>
    <h4><TimeHeader timeString={gameData.date}/></h4>
</div>


