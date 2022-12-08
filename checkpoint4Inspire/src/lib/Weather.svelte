<script>
	let weather = {}
	let c = 0
	let f = 0
	let k = 0
	let currVariation = "f"
	let currTemp = f
	
	async function getWeather() {
		let res = await axios.get("https://bcw-sandbox.herokuapp.com/api/weather/")
		weather = res.data
		k = Math.floor(weather.main.temp)
		c = Math.floor(k - 273.15)
		f = Math.floor((c / 9) * 5 + 32)
		currTemp = f
		console.log(weather)
	}
	getWeather()

	function swapTemp() {
		if (currTemp == f) {
			currTemp = c
			currVariation = "c"
		} else if (currTemp == c) {
			currTemp = k
			currVariation = "k"
		} else {
			currTemp = f
			currVariation = "f"
		}
	}
</script>

<main>
	<h1 on:click={swapTemp}> {currTemp}&deg; {currVariation}</h1>
	<p>{weather.name}</p>
	<img src="https://images.emojiterra.com/twitter/v13.1/512px/2600.png" />
</main>

<style>
	main {
		@apply flex flex-col p-4 gap-3 items-center flex-grow md:flex-grow-0 text-white w-24 cursor-default;
		background-color: rgba(0, 0, 0, 0.589);
		backdrop-filter: blur(10px);
	}
	h1 {
		text-decoration: underline;
		cursor: pointer;
		user-select: none;
	}
	img {
		width: 2rem;
		height: auto;
	}
</style>
