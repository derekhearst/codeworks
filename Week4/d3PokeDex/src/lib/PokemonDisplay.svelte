<script>
	import { Pop } from "../Utils/Pop.js"
	export let selectedPokemon = {}
	let isPokedexApi = selectedPokemon.url || false
	let pokeData = {}
	$: {
		if (selectedPokemon.url) {
			isPokedexApi = true
		} else {
			isPokedexApi = false
			pokeData = selectedPokemon
		}
	}

	async function getData(url) {
		let res = await axios.get(url)
		pokeData = res.data
		console.log("Pokedata ", pokeData)
	}

	async function catchPokemon() {
		let data = {
			name: pokeData.name,
			nickName: pokeData.name,
			img: pokeData.sprites.front_default,
			weight: pokeData.weight,
			height: pokeData.height,
			types: pokeData.types,
			user: "DerekHearst",
		}
		let res = await axios.post("https://bcw-sandbox.herokuapp.com/api/derek/pokemon", data)
		Pop.toast("You caught em!", "success")
	}

	async function releasePokemon(pokeData) {
		if (await Pop.confirm("You sure?")) {
			let res = await axios.delete(`https://bcw-sandbox.herokuapp.com/api/derek/pokemon/` + pokeData.id)
			console.log("DELETED", res)
			selectedPokemon = {}
		}
	}

	async function changeNick(event) {
		let res = await axios.put("https://bcw-sandbox.herokuapp.com/api/derek/pokemon/" + pokeData.id, pokeData)
		Pop.toast("You updated the nickname!")
	}
</script>

<main>
	{#if isPokedexApi}
		{#await getData(selectedPokemon.url)}
			<h1>Waiting for data</h1>
		{:then value}
			<div class="container">
				<h1 class="border-8 rounded-lg border-black bg-red-600 px-3 w-full text-center">
					<p class="border-8 border-red-400 py-4 text-2xl bg-white h-full">
						{pokeData.name}
					</p>
				</h1>
				<img class="flex-grow" src={pokeData.sprites.front_default} />
				<div class="flex flex-col  border-8 border-black px-3 bg-red-600">
					<div class="bg-white px-6 p-3 border-red-400 border-8 flex-col flex">
						<div class="flex flex-wrap gap-x-10 gap-y-2 justify-between">
							<p>Height:{pokeData.height}</p>
							<p>Weight:{pokeData.weight}</p>
							<p>Types:{pokeData.types.map(t => t.type.name).join(", ")}</p>
						</div>
						<button class="text-red-600 border-4 border-red-600 p-3 mt-6" on:click={catchPokemon}>CATCH!</button>
					</div>
				</div>
			</div>
		{:catch error}
			<h1>Error getting data from that url</h1>
		{/await}
	{:else if pokeData.name}
		<div class="container">
			<h1 class="border-8 rounded-lg border-black bg-red-600 px-3 w-full text-center">
				<div class="border-8 border-red-400 py-4 text-2xl bg-white h-full flex justify-between px-3">
					<form class="w-1/2" on:submit|preventDefault={changeNick}>
						<input class="w-full border-2 border-black" bind:value={pokeData.nickName} />
					</form>
					<div>
						{pokeData.name}
					</div>
				</div>
			</h1>
			<img class="flex-grow" src={pokeData.img} />
			<div class="flex flex-col  border-8 border-black px-3 bg-red-600">
				<div class="bg-white px-6 p-3 border-red-400 border-8 flex-col flex">
					<div class="flex flex-wrap gap-x-10 gap-y-2 justify-between">
						<p>Height:{pokeData.height}</p>
						<p>Weight:{pokeData.weight}</p>
						<p>Types:{pokeData.types.map(t => t.type.name).join(", ")}</p>
						<p>User:{pokeData.user}</p>
					</div>
					<button class="text-red-600 border-4 border-red-600 p-3 mt-6" on:click={() => releasePokemon(pokeData)}>Release?</button>
				</div>
			</div>
		</div>
	{/if}
</main>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		height: 100%;
	}
	main {
		@apply flex-auto capitalize h-full;
	}
</style>
