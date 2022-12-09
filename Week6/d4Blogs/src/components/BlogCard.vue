<script setup>
import { ref, onMounted } from "vue"

import { AppState } from "../AppState.js"
import { Blog } from "../models/Blogs.js"
import { logger } from "../utils/Logger.js"
defineProps({
	blog: {
		type: Blog,
		required: true,
	},
})
</script>
<template>
	<div class="blog">
		<div class="d-flex flex-column">
			<div class="d-flex align-items-center gap-2">
				<RouterLink :to="{ name: `User`, params: { id: blog.creatorId } }">
					<img :src="blog.creator.picture" class="creatorImg" />
				</RouterLink>
				<p class="m-0" :title="blog.creator.bio">{{ blog.creator.name }}</p>
				<RouterLink :to="{ name: 'Post', params: { id: blog.id } }">
					<i v-if="blog.creatorId == AppState.account.id" class="mdi mdi-pencil fs-5 btn btn-warning p-1">Edit</i>
				</RouterLink>
			</div>
			<div class="body flex-grow-1">
				<h2>{{ blog.title }}</h2>
				<p class="flex-grow-1">{{ blog.body }}</p>
				<small>{{ blog.createdAt }}</small>
			</div>
		</div>
		<img v-if="blog.imgUrl" :src="blog.imgUrl" class="cardImg" />
	</div>
</template>
<style scoped>
.blog {
	display: flex;
	gap: 1rem;
	border: 2px solid black;
	border-radius: 10px;
	padding: 1rem;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
	justify-content: space-between;
}
.cardImg {
	width: 25rem;
	height: min-content;

	object-fit: cover;
	border-radius: 10px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}
.creatorImg {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 1rem;
	cursor: pointer;
}
.body {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 1rem;
}
small {
	font-size: 0.8rem;
}
</style>
