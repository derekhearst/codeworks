<script>
	import Cars from "./lib/Cars.svelte"
	import Houses from "./lib/Houses.svelte"
	import Jobs from "./lib/Jobs.svelte"

	let selected = "cars"
</script>

<header class="flex gap-6 justify-center p-3 bg-gray-800 text-white">
	<button on:click={() => (selected = "cars")}>Cars</button>
	<button on:click={() => (selected = "houses")}>Houses</button>
	<button on:click={() => (selected = "jobs")}>Jobs</button>
</header>

<div class="pt-4">
	{#if selected == "cars"}
		<Cars />
	{:else if selected == "houses"}
		<Houses />
	{:else}
		<Jobs />
		<!-- else content here -->
	{/if}
</div>

<style>
	button {
		@apply bg-gray-700 p-2 uppercase border-2 rounded;
	}
</style>
