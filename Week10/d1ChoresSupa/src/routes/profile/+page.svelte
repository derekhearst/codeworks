<script lang="ts">
	import Account from '$lib/Account.svelte';
	import Auth from '$lib/Login.svelte';
	import { page } from '$app/stores';
</script>

{#if !$page.data.session}
	<Auth />
{:else}
	<Account session={$page.data.session} />
{/if}
