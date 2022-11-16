<script>
	export let selectedPokemon = {}

	let allPokemon = [{ name: "fred" }, { name: "fred1" }, { name: "fred2" }]
	let filter = ""
	let filteredPokemon = []
	$: {
		filteredPokemon = allPokemon.filter(p => p.name.includes(filter))
	}
	getPokemon()
	async function getPokemon() {
		const res = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=300")
		allPokemon = res.data.results
		// console.log("data", res.data)
	}
</script>

<main>
	<input bind:value={filter} />

	{#each filteredPokemon as pokemon (pokemon)}
		<button on:click={() => (selectedPokemon = pokemon)}>{pokemon.name}</button>
	{/each}
</main>

<style>
	main {
		@apply flex flex-col gap-3 flex-shrink-0 basis-60  bg-white text-black p-2 overflow-y-scroll;
		font-family: "Press Start 2P", cursive;
	}

	button {
		@apply bg-white hover:bg-black hover:text-white text-sm pl-3  text-left capitalize;
	}
	input {
		@apply text-black p-2 border border-black;
	}
</style>
