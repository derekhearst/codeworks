<script setup>
import { ref, onMounted } from "vue"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "../services/AxiosService.js"
import { Blog } from "../models/Blogs.js"
import { useRoute } from "vue-router"
import Pop from "../utils/Pop.js"

let activeBlog = ref({})
onMounted(async () => {
	let blogId = useRoute().params.id
	let res = await api.get("api/blogs/" + blogId)
	logger.log(res.data)
	activeBlog.value = new Blog(res.data)
})

async function updatePost() {
	let res = await api.put("api/blogs/" + activeBlog.value.id, activeBlog.value)
	logger.log(res.data)

	let oldBlog = AppState.blogs.find(b => b.id == activeBlog.value.id)
	oldBlog = new Blog(res.data)
	Pop.success("Post Updated")
}

async function deletePost() {
	let res = await api.delete("api/blogs/" + activeBlog.value.id)
	logger.log(res.data)
	Pop.success("Post Deleted")
}
</script>

<template>
	<main>
		<h1>PostPage</h1>
		<div>
			<form v-if="activeBlog.creatorId == AppState.account.id" @submit.prevent="updatePost" @reset.prevent="deletePost" class="flex-column elevation-5 d-flex gap-2 rounded bg-white p-3">
				<div class="form-group">
					<label for="title">Title</label>
					<input type="text" class="form-control" v-model="activeBlog.title" required name="title" placeholder="Enter Title" />
				</div>
				<div class="form-group">
					<label for="imgUrl">Image</label>
					<input type="text" class="form-control" v-model="activeBlog.imgUrl" id="imgUrl" required name="imgUrl" />
				</div>

				<div class="form-group">
					<label for="body">Body</label>
					<textarea class="form-control" id="body" required name="body" v-model="activeBlog.body" rows="3"></textarea>
				</div>
				<button type="submit" class="btn btn-primary w-25">Update Post</button>
				<button type="reset" class="btn btn-primary w-25">Delete Post</button>
			</form>
		</div>
	</main>
</template>

<style scoped>
main {
	display: flex;
	flex-direction: column;
	gap: 4rem;
	padding: 1rem;
	padding-left: 10rem;
	padding-right: 10rem;
}
</style>
