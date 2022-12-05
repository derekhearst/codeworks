<script>
	export let userName = ""
	export let hidden = false
	export let image = ""
</script>

<main class:hidden style="--img:url({image})">
	<form on:submit|preventDefault={() => (hidden = true)}>
		<input name="name" id="name" placeholder="name" bind:value={userName} />
		<button>Login</button>
	</form>
</main>

<style>
	main {
		@apply text-4xl flex justify-center items-center text-white;
		background: linear-gradient(0deg, transparent, rgba(0, 0, 0, 0.621) 55%, transparent), var(--img);
		background-size: cover;
		position: absolute;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: 200;
	}
	input {
		@apply text-white bg-transparent border-b-2 focus-visible:outline-0;
		max-width: 80vw;
	}
	input::placeholder {
		color: rgba(255, 255, 255, 0.601);
	}

	form {
		@apply flex flex-col items-center gap-4 p-2;
	}
	button {
		@apply text-white border border-white w-fit p-3 pb-4 hover:bg-white hover:text-black transition-colors duration-500;
	}
	.hidden {
		visibility: hidden;
	}
</style>
