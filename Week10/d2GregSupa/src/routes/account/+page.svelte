<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/db';
	import { page } from '$app/stores';
	export let data: PageData;

	let password = '';
	let email = '';

	async function login() {
		let res = await supabaseClient.auth.signInWithPassword({
			email: email,
			password: password
		});
	}
	async function register() {
		let res = await supabaseClient.auth.signUp({
			email: email,
			password: password
		});
	}
	async function logout() {
		let res = await supabaseClient.auth.signOut();
	}
</script>

{#if $page.data.session}
	<h1>{$page.data.session.user.email}</h1>
	<button on:click={logout}>Logout</button>
{:else}
	<form on:submit|preventDefault>
		<label for="email">Email</label>
		<input type="email" name="email" autocomplete="email" id="email" required bind:value={email} />
		<label for="password">Password</label>
		<input
			type="password"
			name="password"
			id="password"
			autocomplete="current-password"
			required
			bind:value={password}
		/>
		<button on:click={login}>Login</button>
		<button on:click={register}>Register</button>
	</form>
{/if}
