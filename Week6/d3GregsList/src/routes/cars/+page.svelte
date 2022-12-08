<script>
	import { cars, activeCar } from '$lib/stores'
	import { onMount } from 'svelte'
	import axios from 'axios'
	import Swal from 'sweetalert2'
	import { goto } from '$app/navigation'

	let editing = false

	onMount(async () => {
		let res = await axios.get('https://bcw-sandbox.herokuapp.com/api/cars')
		cars.set(res.data)
	})

	async function submitCar() {
		let res = await axios.put('https://bcw-sandbox.herokuapp.com/api/cars/' + $activeCar.id, $activeCar)
		console.log('updated car', res.data)
		Swal.fire({
			title: 'Success!',
			text: 'Car Added',
			icon: 'success',
			confirmButtonText: 'Cool'
		})
	}
</script>

<svelte:head>
	<title>CARS</title>
</svelte:head>
<section>
	<h1>CARS</h1>
</section>

<form on:submit|preventDefault={submitCar}>
	<input type="text" bind:value={activeCar.make} placeholder="Make" name="make" />
	<input type="text" bind:value={activeCar.model} placeholder="Model" name="model" />
	<input type="number" bind:value={activeCar.year} placeholder="Year" name="year" />
	<input type="number" bind:value={activeCar.price} placeholder="Price" name="price" />
	<input type="text" bind:value={activeCar.description} placeholder="Description" name="description" />
	<input type="text" bind:value={activeCar.imgUrl} placeholder="ImgUrl" name="imgUrl" />
	<button type="submit" class="btn">Submit Car</button>
</form>

<section />

<section class="cars">
	{#each $cars as car}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="car cursor-pointer"
			on:click={() => {
				goto('/cars/' + car.id)
			}}>
			<img src={car.imgUrl} alt={car.make} />
			<h3>{car.make} {car.model}</h3>
			<h4>{car.year} - ${car.price}</h4>
			<p>{car.description}</p>
		</div>
	{/each}
</section>

<style lang="postcss">
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
	}
	.cars {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: stretch;
	}
	.car {
		flex: 1 1 300px;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 1px solid black;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.188);
	}
	img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		margin: 0;
		border-bottom: 2px solid black;
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
