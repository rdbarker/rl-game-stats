<script>
    import {fetchGame, fetchListOfGames} from "./scripts/apiFetch";
    import Match from "./Match.svelte"
    export let apiKey = "";
    export let keyVerified = false;

    import { onMount } from 'svelte';

	let time = new Date();
    let secondsBetweenRefresh = 10;
    let games = new Map();
    

	$: seconds = time.getSeconds();
    $: if(seconds % secondsBetweenRefresh == 0 && keyVerified) refreshGames();

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

    async function refreshGames(){
        let gamesList = await fetchListOfGames(apiKey, 15);
        
        gamesList.list.forEach(item =>{
            if (!games.has(item.id)){
                games.set(item.id, {}); 
            }
        });

        for(const [key, value] of games){
            if(value === false || !("status" in value)){
                games.set(key, await loadMatch(key));
                delay(500);
                games = sortGames(games);
            } 
        }
    }

    async function loadMatch(gameId){
        console.log("loading a game");
        return await fetchGame(apiKey, gameId);
    }

    function sortGames(games){
        return new Map([...games].sort(([key1, value1],[key2, value2]) => {
            let entry1Date = new Date(value1.date);
            let entry2Date = new Date(value2.date);
            return entry2Date - entry1Date;
        } ));
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

</script>

{#each [...games] as [gameId, stats] (gameId)}
    <Match gameData = {stats}/>
{/each}