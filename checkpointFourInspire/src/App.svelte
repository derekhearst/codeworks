<script lang="ts">
	import Login from "./lib/Login.svelte"
	import Weather from "./lib/Weather.svelte"
	import Time from "./lib/Time.svelte"
	import Todo from "./lib/Todo.svelte"

	async function getImage() {
		let res = await axios.get("https://bcw-sandbox.herokuapp.com/api/images")
		bgImage = res.data.largeImgUrl
		photographer = res.data.author
	}

	async function getQuote() {
		let res = await axios.get("https://bcw-sandbox.herokuapp.com/api/quotes")
		console.log(res.data)
		quote = res.data.content
		author = res.data.author
	}
	getQuote()

	getImage()
	let photographer = ""
	let quote = "na"
	let author = "na"
	let user = ""
	let loginHidden = false
	let bgImage = "https://pixabay.com/get/g1603c805968cde0dd648fa7475bc18409925d21be5ec763e6a609975a67a280ae64cdb12472e2a1c41df6a11ac415fab_640.jpg"
</script>

<main style="--bgImage: url({bgImage})">
	{#if !loginHidden}
		<Login bind:hidden={loginHidden} bind:userName={user} bind:image={bgImage} />
	{:else}
	<header>
		<p class="blurred flex-grow md:flex-grow-0 h-fit text-white cursor-default">Image by {photographer}</p>
		<Weather class="" />
	</header>
	<Time />
	<footer>
		<q class="blurred italic text-sm flex-grow md:flex-grow-0 text-white cursor-default" title={author}>{quote}</q>
		<Todo {user} />
	</footer>
		 <!-- else content here -->
	{/if}

	
</main>

<style>
	main {
		position: relative;
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: space-between;
		align-items: center;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.452) var(--bgImage);
		background-size: cover;
		@apply p-2 md:p-4 gap-2;
	}

	.blurred {
		backdrop-filter: blur(10px);
		background-color: rgba(0, 0, 0, 0.515);
		border-radius: 0.25rem;
		padding: 0.5rem;
	}
	header {
		@apply flex justify-between w-full flex-wrap gap-5;
	}
	footer {
		@apply flex justify-between items-end w-full gap-4 flex-grow flex-wrap md:flex-nowrap;
	}
</style>
