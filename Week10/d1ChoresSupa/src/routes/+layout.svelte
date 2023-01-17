<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<header>
	<h1>Supabase + SvelteKit</h1>
	<nav>
		<a href="/">Home</a>
		<a href="/profile">Profile</a>
	</nav>
</header>
<slot />
