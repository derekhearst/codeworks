<script>
	let time = new Date()
	setInterval(() => {
		time = new Date()
	}, 1000)
</script>

<p>{time.toLocaleTimeString()}</p>

<style>
	p {
		@apply text-white text-6xl p-1 w-fit p-2;
		background: rgba(0, 0, 0, 0.441);
		backdrop-filter: blur(10px);
	}
</style>
