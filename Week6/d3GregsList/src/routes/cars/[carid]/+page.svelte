<script>
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import Swal from 'sweetalert2'
	import axios from 'axios'
	let car = {}
	onMount(async () => {
		let res = await axios.get('https://bcw-sandbox.herokuapp.com/api/cars/' + $page.params.carid)
		car = res.data
	})
	async function updateCar() {
		let res = await axios.put('https://bcw-sandbox.herokuapp.com/api/cars/' + $page.params.carid, car)
		car = res.data
		Swal.fire({
			title: 'Success!',
			text: 'Car Updated',
			icon: 'success',
			confirmButtonText: 'Cool'
		})
	}
</script>

<section>
	<form on:submit|preventDefault={updateCar}>
		<input type="text" bind:value={car.make} placeholder="Make" name="make" />
		<input type="text" bind:value={car.model} placeholder="Model" name="model" />
		<input type="number" bind:value={car.year} placeholder="Year" name="year" />
		<input type="number" bind:value={car.price} placeholder="Price" name="price" />
		<input type="text" bind:value={car.description} placeholder="Description" name="description" />
		<input type="text" bind:value={car.imgUrl} placeholder="ImgUrl" name="imgUrl" />
		<button type="submit">Update Car</button>
	</form>

	<div>
		<img src={car.imgUrl} alt={car.make} />
		<h3>{car.make} {car.model}</h3>
		<h4>{car.year} - ${car.price}</h4>
		<p>{car.description}</p>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	img {
		width: 100%;
		height: 500px;
		object-fit: cover;
	}
	button {
		background-color: #4caf50;
		border: none;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 4px 2px;
		cursor: pointer;
	}
</style>
