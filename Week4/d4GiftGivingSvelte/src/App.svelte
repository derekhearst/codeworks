<script>
	import GiftsList from "./lib/GiftsList.svelte"
	import GiphyList from "./lib/GiphyList.svelte"
	import { getFormData } from "./Utils/FormHandler.js"
	let selectedGif = null
	let filter = ""
	let giftList = {}

	async function createGift(e) {
		let data = getFormData(e.target)
		let res = await axios.post("https://bcw-sandbox.herokuapp.com/api/gifts", data)
		console.log(res)
		giftList.getGifts()
	}
</script>

<main>
	<nav>
		<h1>Gifted!</h1>
		<form on:submit|preventDefault={createGift}>
			<label for="tag">Tag</label>
			<input type="text" required id="tag" name="tag" value={selectedGif?.title || ""} />
			<label for="url">Picture</label>
			<input type="url" id="url" required name="url" value={selectedGif?.images.downsized.url || ""} />
			<button>Submit!</button>
		</form>
		<hr class="my-4" />
		<h2>Search for gifs on gifpy!</h2>
		<form on:submit|preventDefault={e => (filter = e.target.filter.value)}>
			<input type="text" id="filter" name="filter" />
		</form>
		<GiphyList bind:selectedGif {filter} />
	</nav>
	<GiftsList bind:this={giftList} />
</main>

<style>
	main {
		@apply flex gap-3   justify-center;
	}
	nav {
		@apply flex flex-col p-3 gap-2 border-r-8 border-green-900 bg-green-800 text-white max-w-sm;
	}
	h1 {
		@apply text-5xl font-serif p-2;
	}

	form {
		@apply flex flex-col flex-wrap  gap-1;
	}

	form label {
		@apply pt-3;
	}
	input {
		@apply shadow-sm text-black;
	}
	form button {
		@apply mt-3 p-2 bg-green-500 text-black;
	}
</style>
