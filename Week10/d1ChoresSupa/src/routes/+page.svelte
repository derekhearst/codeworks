<script>
	import { page } from '$app/stores';
	import Account from '$lib/Account.svelte';
	import Auth from '$lib/Login.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	const { data, error } = await supabase.from('chores').select('*');

	async function createChore() {}
</script>

<svelte:head>
	<title>Supabase + SvelteKit</title>
	<meta name="description" content="SvelteKit using supabase-js v2" />
</svelte:head>

<form on:submit={createChore} />

<h1>Chores</h1>
{#if chores.data}
	{#each chores.data as chore}
		<div>{chore.name}</div>
	{/each}
{/if}
