<script>
	let promise = getRandomNumber();

	async function getRandomNumber() {
		const myHeaders ={
			"Authorization": 'YZWqXzZeoLgNfxLAjmrBmcAJWqNeOqfNMscvO2el'
		};

		let requestHeaders = new Headers();
		requestHeaders.append("Authorization", 'YZWqXzZeoLgNfxLAjmrBmcAJWqNeOqfNMscvO2el');

		const res = await fetch(`https://ballchasing.com/api/`,{  
			method: 'GET',
			mode: 'no-cors',
			headers: {
    			Authentication: 'YZWqXzZeoLgNfxLAjmrBmcAJWqNeOqfNMscvO2el'
  				}
		});
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

<button on:click={handleClick}>
	generate random number
</button>

<h1>Hello</h1>

{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}