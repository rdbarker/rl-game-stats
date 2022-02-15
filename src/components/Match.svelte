<script>
    import TimeHeader from "./match/TimeHeader.svelte";
    import Player from "./match/Player.svelte";

    export let gameData = {};
    let isDataLoaded = false;
    let gameStats = {
        time: "timestring",
        map: "map_code",
        matchType: "match_type",
        teamSize: "team_size"
    };
    let myTeam = {
  
    };
    let otherTeam = {
        color: "blue",
        players: {},

    };

    $: if(gameData.status === "ok"){
        isDataLoaded = true;
        buildGameStats();
    }

    function buildGameStats(){
        let usersTeam = "blue";
        //find user's team
        let usersId = gameData.uploader.steam_id;
        let teamBlue = gameData.blue;
        let teamOrange = gameData.orange;

        let isPlayerOrange = teamOrange.players.map(player =>player.id.id ).includes(usersId);
        if (isPlayerOrange) usersTeam = "orange";
    }

    

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
   {#if isDataLoaded}
        <TimeHeader timeString={gameData.date}/>
        
        {#each gameData.blue.players as bluePlayer}
            <Player name={bluePlayer.name} platform={bluePlayer.id.platform} platformId={bluePlayer.id.id}/>
        {/each}
    {:else}
        loading...
    {/if}
</div>

