<script setup>
import { ref, onMounted } from "vue"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "../services/AxiosService.js"
import { Blog } from "../models/Blogs.js"
import { useRoute } from "vue-router"
import BlogCard from "../components/BlogCard.vue"

let blogs = ref([])
let creatorId = useRoute().params.id
let creator = ref({})

onMounted(async () => {
	if (!AppState.blogs.length) {
		let res = await api.get("api/blogs")
		AppState.blogs = res.data.map(b => new Blog(b))
	}
	blogs.value = AppState.blogs.filter(b => b.creatorId == creatorId)
	if (blogs.value.length > 0) {
		creator.value = blogs.value[0].creator
		logger.log(creator.value)
	}
})
</script>
<template>
	<div v-if="creator" class="body">
		<div class="d-flex gap-5">
			<img class="bioImage" :src="creator.picture" />
			<div>
				<h1>{{ creator.name }}</h1>
				<h3>{{ blogs.length }} {{ blogs.length > 1 ? "blogs" : "blog" }}</h3>
			</div>
		</div>
		<div class="blogs">
			<div v-for="b in blogs">
				<BlogCard :blog="b" />
			</div>
		</div>
	</div>
	<div v-else>
		<h1>No blogs found</h1>
	</div>
</template>
<style scoped>
.body {
	display: flex;
	flex-direction: column;
	gap: 4rem;
	padding: 1rem;
	padding-left: 10rem;
	padding-right: 10rem;
}

.blogs {
	display: flex;
	flex-direction: column;
	gap: 4rem;
}

.bioImage {
	width: 200px;
	height: 200px;
	border-radius: 50%;
	object-fit: cover;
}
</style>
