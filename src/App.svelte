

<script>
	import MatchesList from './components/MatchesList.svelte';
	import KeyInput from './components/KeyInput.svelte';
	
  let apiKey;
  let keyVerified;
</script>

<KeyInput bind:apiKey={apiKey} bind:keyVerified={keyVerified} /> 

<MatchesList bind:apiKey={apiKey} bind:keyVerified={keyVerified} />

