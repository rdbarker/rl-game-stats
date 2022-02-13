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
    <TimeHeader timeString={gameData.date}/>
</div>


