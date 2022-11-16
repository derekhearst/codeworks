<script>
	import { Pop } from "../Utils/Pop.js"

	async function getCars() {
		const res = await axios.get("https://bcw-sandbox.herokuapp.com/api/cars")
		cars = res.data.map(c => new Car(c))
	}
	getCars()

	let cars = []
	class Car {
		constructor(data) {
			this.data = data
		}
	}
	let activeCar = new Car({})

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
			const res = await axios.put("https://bcw-sandbox.herokuapp.com/api/cars/" + data.id, data)
			console.log("[PUT]", res)
			activeCar = new Car({})
			Pop.toast("Edited a listing!")
		} else {
			console.log("CREATING", data)
			const res = await axios.post("https://bcw-sandbox.herokuapp.com/api/cars", data)
			console.log("[POST]", res)
			Pop.toast("Created a listing!")
		}
		event.target.reset()
		getCars()
	}

	async function removeID(id) {
		let car = cars.find(c => c.data.id == id)
		if (car) {
			const res = await axios.delete(`https://bcw-sandbox.herokuapp.com/api/cars/${car.data.id}`)
			cars = cars.filter(c => c.data.id != id)
			Pop.toast("Removed that car!")
		}
	}
	function viewID(id) {}
	function editID(id) {
		activeCar = cars.find(c => c.data.id == id)
		Pop.toast("Now Editing")
	}
</script>

<h1 class="bg-gray-800 text-white text-center p-3">JOBS</h1>

<main>
	<form class="flex my-5 p-3 m-6 rounded gap-3 flex-wrap bg-gray-800" on:submit|preventDefault={submitForm}>
		<input id="id" name="id" type="hidden" value={activeCar.data.id} />
		<div class="flex gap-3 flex-wrap">
			<div class="field">
				<label>Make :</label>
				<input id="make" name="make" type="text" required value={activeCar.data.make || ""} />
			</div>
			<div class="field">
				<label>Model :</label>
				<input id="model" name="model" type="text" required value={activeCar.data.model || ""} />
			</div>
			<div class="field">
				<label>Year :</label>
				<input id="year" name="year" type="number" required value={activeCar.data.year || ""} />
			</div>
			<div class="field">
				<label>Price :</label>
				<input id="price" name="price" type="number" required value={activeCar.data.price || ""} />
			</div>
			<div class="field">
				<label>Picture :</label>
				<input id="imgUrl" name="imgUrl" type="text" required value={activeCar.data.imgUrl || ""} />
			</div>
			<div class="field">
				<label>Description :</label>
				<input id="description" name="description" type="text" required value={activeCar.data.description || ""} />
			</div>
		</div>

		<div class="mx-auto gap-3 flex">
			<button class="mx-auto p-3 bg-blue-800">Submit New Car</button>
		</div>
	</form>
</main>
<main>
	{#each cars as car (car.data.id)}
		<div class="flex-shrink basis-72 flex flex-col rounded bg-gray-700">
			<img class="rounded-t" src={car.data.imgUrl} />
			<div class="p-3 flex flex-col flex-grow">
				<h1>{car.data.year} {car.data.make} {car.data.model}</h1>
				<h2>${car.data.price}</h2>
				<div class="flex justify-between mt-auto">
					<button class="border-b text-red-400" on:click={() => removeID(car.data.id)}>Delete!</button>
					<button class="border border-gray-600" on:click={() => editID(car.data.id)}>Edit!</button>
					<button class="bg-blue-800 text-xl" on:click={() => viewID(car.data.id)}>Info!</button>
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
