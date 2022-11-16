<script>
	import { Pop } from "../Utils/Pop.js"

	async function getHouses() {
		const res = await axios.get("https://bcw-sandbox.herokuapp.com/api/houses")
		houses = res.data.map(c => new House(c))
	}
	getHouses()

	let houses = []
	class House {
		constructor(data) {
			this.data = data
		}
	}
	let activeHouse = new House({})

	async function submitForm(event) {
		const formData = new FormData(event.target)
		let data = {}
		for (let field of formData) {
			const [key, value] = field
			data[key] = value
		}
		console.log(data)
		if (data.id != "undefined") {
			console.log("Editing", data.id)
			const res = await axios.put("https://bcw-sandbox.herokuapp.com/api/houses/" + data.id, data)
			console.log("[PUT]", res)
			activeHouse = new House({})
			Pop.toast("Edited a listing!")
		} else {
			console.log("CREATING", data)
			const res = await axios.post("https://bcw-sandbox.herokuapp.com/api/houses", data)
			console.log("[POST]", res)
			Pop.toast("Created a listing!")
		}
		event.target.reset()
		getHouses()
	}

	async function removeID(id) {
		let house = houses.find(c => c.data.id == id)
		if (house) {
			const res = await axios.delete(`https://bcw-sandbox.herokuapp.com/api/houses/${house.data.id}`)
			houses = houses.filter(c => c.data.id != id)
			Pop.toast("Removed that house!")
		}
	}
	function viewID(id) {}
	function editID(id) {
		activeHouse = houses.find(c => c.data.id == id)
		Pop.toast("Now Editing")
	}
</script>

<h1 class="bg-gray-800 text-white text-center p-3">HOUSES</h1>
<main>
	<form class="flex my-5 p-3 m-6 rounded gap-3 flex-wrap bg-gray-800" on:submit|preventDefault={submitForm}>
		<input id="id" name="id" type="hidden" value={activeHouse.data.id} />
		<div class="flex gap-3 flex-wrap">
			<div class="field">
				<label>Bedrooms</label>
				<input id="bedrooms" name="bedrooms" type="number" required value={activeHouse.data.bedrooms || ""} />
			</div>
			<div class="field">
				<label>Bathrooms:</label>
				<input id="bathrooms" name="bathrooms" type="number" required value={activeHouse.data.bathrooms || ""} />
			</div>
			<div class="field">
				<label>Levels :</label>
				<input id="levels" name="levels" type="number" required value={activeHouse.data.levels || ""} />
			</div>
			<div class="field">
				<label>Year :</label>
				<input id="year" name="year" type="number" required value={activeHouse.data.year || ""} />
			</div>
			<div class="field">
				<label>Price :</label>
				<input id="price" name="price" type="number" required value={activeHouse.data.price || ""} />
			</div>
			<div class="field">
				<label>Description :</label>
				<input id="description" name="description" type="text" required value={activeHouse.data.description || ""} />
			</div>
		</div>

		<div class="mx-auto gap-3 flex">
			<button class="mx-auto p-3 bg-blue-800">Submit New House</button>
		</div>
	</form>
</main>
<main>
	{#each houses as house (house.data.id)}
		<div class="flex-shrink basis-72 flex flex-col rounded bg-gray-700">
			<img class="rounded-t" src={house.data.imgUrl} />
			<div class="p-3 flex flex-col flex-grow">
				<h1>${house.data.price}</h1>

				<h2>{house.data.bedrooms} bedrooms, {house.data.bathrooms} bathrooms, {house.data.levels} levels</h2>
				<h2>Built {house.data.year}</h2>
				<div class="flex justify-between mt-auto">
					<button class="border-b text-red-400" on:click={() => removeID(house.data.id)}>Delete!</button>
					<button class="border border-gray-600" on:click={() => editID(house.data.id)}>Edit!</button>
					<button class="bg-blue-800 text-xl" on:click={() => viewID(house.data.id)}>Info!</button>
				</div>
			</div>
		</div>
	{/each}
</main>

<style>
	input {
		@apply bg-gray-600 text-white;
	}
	main {
		@apply flex gap-4 flex-wrap justify-center text-white;
	}
	h1 {
		@apply text-xl text-ellipsis;
	}
	button {
		@apply px-3;
	}

	.field {
		@apply flex-auto basis-4/12 flex justify-evenly border p-2 rounded border-gray-700;
	}
</style>
