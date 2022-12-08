<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	async function getBlogDetails() {
		const res = await fetch('https://bcw-sandbox.herokuapp.com/api/blogs/' + $page.params.id);
		const data = await res.json();
		return data;
	}
</script>

<section>
	{#await getBlogDetails()}
		<h1>Loading</h1>
	{:then blog}
		<h1>{blog.title}</h1>
		<p>{blog.body}</p>
	{/await}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 70ch;
		margin: auto;
	}
</style>
