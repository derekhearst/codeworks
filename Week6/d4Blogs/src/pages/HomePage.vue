<script setup>
import { ref, onMounted } from "vue"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "../services/AxiosService.js"
import { Blog } from "../models/Blogs.js"
import BlogCard from "../components/BlogCard.vue"
import Pop from "../utils/Pop.js"

onMounted(async () => {
	let res = await api.get("api/blogs")
	AppState.blogs = res.data.map(b => new Blog(b))
	logger.log(AppState.blogs)
})

async function createPost() {
	let form = event.target
	let rawBlog = {
		title: form.title.value,
		body: form.body.value,
		imgUrl: form.imgUrl.value,
		creatorId: AppState.account.id,
		published: true,
	}
	let res = await api.post("api/blogs", rawBlog)
	let newBlog = new Blog(res.data)
	Pop.success("Blog Created", "Success, your blog has been created")
	AppState.blogs.unshift(newBlog)
	form.reset()
}
</script>

<template>
	<main>
		<section>
			<h1>Make Post</h1>
			<form class="flex-column elevation-5 d-flex gap-2 rounded bg-white p-3" @submit.prevent="createPost">
				<div class="form-group">
					<label for="title">Title</label>
					<input type="text" class="form-control" required name="title" placeholder="Enter Title" />
				</div>
				<div class="form-group">
					<label for="imgUrl">Image</label>
					<input type="url" class="form-control" id="imgUrl" required name="imgUrl" />
				</div>

				<div class="form-group">
					<label for="body">Body</label>
					<textarea class="form-control" id="body" required name="body" rows="3"></textarea>
				</div>
				<button type="submit" class="btn btn-primary w-25">Make Post</button>
			</form>
		</section>
		<h1 class="p-0">Posts</h1>
		<section class="posts">
			<div v-for="b in AppState.blogs">
				<BlogCard :blog="b" />
			</div>
		</section>
	</main>
</template>

<style scoped lang="scss">
.posts {
	display: flex;
	flex-direction: column;
	gap: 4rem;
}
main {
	padding: 1rem;
	padding-left: 10rem;
	padding-right: 10rem;
}
</style>
