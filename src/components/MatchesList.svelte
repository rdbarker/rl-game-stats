<script>
    import {fetchListOfGames} from "./scripts/apiFetch";
    export let apiKey = "";
    export let keyVerified = false;

    import { onMount } from 'svelte';

	let time = new Date();
    let secondsBetweenRefresh = 10;
    let games = [];

	$: seconds = time.getSeconds();

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
    let gamesPromise = fetchListOfGames(apiKey, 15);
    async function refresh(){
        if(seconds % secondsBetweenRefresh == 0 && keyVerified){
            gamesPromise = await fetchListOfGames(apiKey, 15);
            console.log(gamesPromise);
    }
}
</script>

