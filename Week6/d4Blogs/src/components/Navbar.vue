<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
		<router-link class="navbar-brand d-flex align-items-center gap-2" :to="{ name: 'Home' }">
			<i class="mdi mdi-email-seal fs-1"></i>
			<h1>Blogger</h1>
		</router-link>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="navbar-collapse collapse" id="navbarText">
			<ul class="navbar-nav me-auto">
				<li></li>
			</ul>
			<!-- LOGIN COMPONENT HERE -->
			<Login />
		</div>
	</nav>
</template>

<script>
import Login from "./Login.vue"
export default {
	setup() {
		return {}
	},
	components: { Login },
}
</script>

<style scoped>
a:hover {
	text-decoration: none;
}

.navbar {
	background-color: #ffc017 !important;
}
.nav-link {
	text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
	border-bottom: 2px solid var(--bs-success);
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
	nav {
		height: 64px;
	}
}
</style>
