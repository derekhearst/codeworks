<script lang="ts">
	import { supabaseClient } from '$lib/db.js';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let cars: any[] = [];
	onMount(async () => {
		const { data, error } = await supabaseClient.from('cars').select('*');
		cars = data ?? [];
	});

	async function makeCar(e) {
		const { data: Car } = await supabaseClient
			.from('cars')
			.insert({
				make: e.target.make.value,
				model: e.target.model.value,
				year: e.target.year.value,
				price: e.target.price.value,
				img_url: e.target.img_url.value
				// user_id: data.session?.user.id
			})
			.select();
		cars = [...cars, Car[0] || {}];
	}

	async function remove(id) {
		let res = await supabaseClient.from('cars').delete().eq('id', id);
		cars = cars.filter((car) => car.id !== id);
	}
</script>

<form on:submit={makeCar}>
	<label for="make">Make</label>
	<input type="text" required name="make" id="make" />
	<label for="model">Model</label>
	<input type="text" required name="model" id="model" />
	<label for="year">Year</label>
	<input type="number" required name="year" id="year" />
	<label for="price">Price</label>
	<input type="number" required name="price" id="price" />
	<label for="img_url">Image URL</label>
	<input type="text" required name="img_url" id="img_url" />
	<button type="submit">Make Car</button>
</form>

{#each cars as car}
	<div>
		{car.make}
		{car.model}
		{car.year}
		{car.price}
		<img src={car.img_url} alt="No Image" />
		<button on:click|once={remove(car.id)}>Remove</button>
	</div>
{/each}

<style>
	img {
		width: 100px;
		height: 100px;
	}
</style>
