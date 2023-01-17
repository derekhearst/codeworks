<script>
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<header>
	<h1>Gregslist</h1>
	<a href="/">Home</a>
	<a href="/account">Account</a>
	<a href="/cars">Cars</a>
</header>
<slot />

<style>
	@import '../app.css';
</style>
