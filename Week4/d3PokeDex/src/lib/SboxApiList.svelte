<script>
	export let selectedPokemon = {}

	let allPokemon = []
	let filter = ""
	let filteredPokemon = []
	$: {
		filteredPokemon = allPokemon.filter(p => p.name.includes(filter))
	}
	getPokemon()
	async function getPokemon() {
		const res = await axios.get("https://bcw-sandbox.herokuapp.com/api/derek/pokemon")
		allPokemon = res.data
		// console.log("data", res.data)
	}
</script>

<main>
	<h1>Caught Pokemon</h1>
	<input bind:value={filter} />
	{#each filteredPokemon as pokemon (pokemon)}
		<button on:click={() => (selectedPokemon = pokemon)}>{pokemon.nickName}</button>
	{/each}
</main>

<style>
	main {
		@apply flex flex-col gap-1 bg-red-900 p-2 text-white w-min max-w-sm;
	}
	button {
		@apply hover:bg-red-800 border border-red-800 uppercase rounded shadow;
	}
	input {
		@apply text-black p-2;
	}
</style>
