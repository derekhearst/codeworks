<script>
	async function getGifs(filter) {
		let res = await axios.get("https://api.giphy.com/v1/gifs/trending", { params: { api_key: "MMeuX1kitbCppFxppi6sspmUVGc0MBGb", limit: 25, rating: "pg" } })
		gifs = res.data.data
		console.log(gifs)
	}
	async function getFilteredGifs(filter) {
		let res = await axios.get("https://api.giphy.com/v1/gifs/search", { params: { api_key: "MMeuX1kitbCppFxppi6sspmUVGc0MBGb", limit: 10, rating: "pg", lang: "en", q: filter } })
		gifs = res.data.data
		console.log(gifs)
	}
	let gifs = []
	export let selectedGif = null
	export let filter = ""
	$: {
		if (filter.length > 1) {
			getFilteredGifs(filter)
		} else {
		}
		getGifs()
	}
</script>

<body class="flex gap-2 flex-wrap w-full">
	{#each gifs as gif (gif)}
		<img class="flex-auto border border-black select-none cursor-pointer" on:click={() => (selectedGif = gif)} src={gif.images.downsized.url} alt={gif.tile} />
	{/each}
</body>
