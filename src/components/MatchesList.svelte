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

    let gamesPromise = fetchListOfGames(apiKey, 15);

    async function refreshGames(){
        gamesPromise = await fetchListOfGames(apiKey, 15);
        gamesPromise.list.forEach(item =>{
            if (!games.has(item.id)){
                games.set(item.id, {}); 
            }
        });

        for(const [key, value] of games){
            if(value === false || !("status" in value)){
                games.set(key, await loadMatch(key));
            } 
        }
        games = games;
    }

    async function loadMatch(gameId){
        return await fetchGame(apiKey, gameId);
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

</script>

{#each [...games] as [gameId, stats]}
    <Match gameData = {stats}/>
{/each}