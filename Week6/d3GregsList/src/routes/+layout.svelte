<script>
	import '../app.postcss'
</script>

<main class="prose max-w-none">
	<a href="/"><h1>GregsList</h1></a>
	<div class="gap-3 flex">
		<a href="/cars">Cars</a>
		<a href="/houses">Houses</a>
		<a href="/jobs">Jobs</a>
	</div>
	<slot />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
	}
</style>
