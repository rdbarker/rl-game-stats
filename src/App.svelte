<script>
	let promise = getRandomNumber();
	let apiKey = "";
	async function getRandomNumber() {
		let myHeaders = new Headers();
		myHeaders.append("Authorization", apiKey);
		
		let requestOptions = {
  		method: 'GET',
  		headers: myHeaders,
  		mode: 'cors'
		
	};
		const res = await fetch("https://safe-plateau-49424.herokuapp.com/https://ballchasing.com/api/", requestOptions);
		const text = await res.text();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
	}

	function handleClick() {
		promise = getRandomNumber();
	}
</script>

<input bind:value={apiKey} placeholder="enter your api key"> 
<p>{apiKey}</p>

<button on:click={handleClick}>
	Refresh
</button>

<h1>Hello</h1>

{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}