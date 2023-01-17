<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let loading = false;
	let password: string;
	let email: string;

	async function handleLogin() {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithPassword({ email, password });
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}

	async function handleSignUp() {
		try {
			loading = true;
			const { error } = await supabase.auth.signUp({ email, password });
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}
</script>

<form on:submit|preventDefault={handleLogin}>
	<label for="email">Email</label>
	<input type="email" bind:value={email} id="email" />
	<label for="password">Password</label>
	<input type="password" bind:value={password} id="password" />
	<button type="submit" disabled={loading}>Login</button>
	<button type="button" disabled={loading} on:click={handleSignUp}>Sign up</button>
</form>
