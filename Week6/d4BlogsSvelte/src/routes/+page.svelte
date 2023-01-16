<script>
	import { blogPosts } from '$lib/stores.js';
	import { onMount } from 'svelte';

	onMount(async () => {
		const res = await fetch('https://bcw-sandbox.herokuapp.com/api/blogs');
		const data = await res.json();
		console.log(data);
		blogPosts.set(data);
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<header class="text-center p-1">
		<h1 class="m-0">Derek's Blogs</h1>
		<a href="/new">Create New Blog</a>
	</header>
	<div class="blogs">
		{#each $blogPosts as blog}
			<div class="blog">
				<div>
					<div class="flex gap-2">
						<img class="img-fluid m-0 h-10 w-10 object-cover" alt={blog.creator.name} src={blog.creator.picture} />
						<h2 class="m-0">{blog.title}</h2>
					</div>
					<p class="text-xs">{blog.creator.name}</p>
				</div>
				<div class="flex-1 border-y-2 flex">
					<p class="flex-1">{blog.body}</p>
					<img src={blog.imgUrl} class=" h-40 object-cover" />
				</div>
				<div class="flex justify-between items-center">
					<a href="/{blog.id}">READ MORE</a>
					<sub class="">{blog.updatedAt}</sub>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.blogs {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem;
	}
	.blog {
		@apply shadow-lg border px-2 py-1 flex flex-col justify-between;
		flex: 1 1 30rem;
	}
	p {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		overflow: hidden;
		margin: 0.25rem;
	}
</style>
