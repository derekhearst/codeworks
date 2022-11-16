<script lang="ts">
	import DisplayedPokemon from "./lib/PokemonDisplay.svelte"
	import PokedexApiList from "./lib/PokedexApiList.svelte"
	import SboxApiList from "./lib/SboxApiList.svelte"
	let selectedPokemon = {}

	let myPokemonVisible = false
</script>

<main>
	<div class="title">
		<div class="flex-auto" />
		<h1 class="flex-auto">Pokemans</h1>
		<buton class="bg-white rounded flex text-black pl-auto p-3 cursor-pointer" on:click={() => (myPokemonVisible = true)}>My Pokemans</buton>
	</div>
	<div class="flex p-4 gap-10 overflow-y-clip h-full">
		<DisplayedPokemon {selectedPokemon} />
		<PokedexApiList bind:selectedPokemon />
	</div>
</main>

{#if myPokemonVisible}
	<div class="myPoke">
		<div class="flex-auto bg-black/50 cursor-pointer" on:click={() => (myPokemonVisible = false)} />
		<SboxApiList bind:selectedPokemon />
	</div>
{/if}

<style>
	main {
		background: url("https://s3-alpha-sig.figma.com/img/39ea/8f79/f356d984629d52086b6a8787645a1168?Expires=1669593600&Signature=FAE8sfClEHL5ShaaNUVP21G2NE-BkcHaFDm5pW2zhNQb8wTTGJURD7LZG77k7C3oedFd6jXOoIeaqSwnff3N8ffR1hRYOzuJNkD3uXRWa00sVizUX6rJQHSJv~T2BoaCN2SllSXmZ21ntsgwRPxL6QrXLDJJv4Hqs8F7GsBsDWQBB7VTs14ZXkAyn8jb0nE7yWf4PvBra4s9mE261wEoXav0wGQb6KCjlZgDYTYr6RJRNIfGGhHMbzBkjU-sPFQLyDlcjr1fX56TDOBuxrQ-9MVgn81grq0onSud0PRl~14wRww4kHhUIQYZU4iq5OhH9UfxAyQN4T97wrSMyA~WOA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA");
		max-width: 100vw;
		height: 100vh;
		background-size: cover;
		flex-direction: column;
		display: flex;
	}

	.title {
		@apply border-b-black border-b-8 w-full p-5 text-center bg-red-600 text-white flex justify-between;
	}
	h1 {
		text-shadow: 0 4px black;
		font-size: 2rem;
		justify-self: center;
	}

	.myPoke {
		position: absolute;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		display: flex;
	}
</style>
