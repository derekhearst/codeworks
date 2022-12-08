<script>
	import { Pop } from "../Utils/Pop.js"

	export let user = null
	$: {
		if (user) {
			getTodos()
		}
	}
	async function getTodos() {
		if (user) {
			let res = await axios.get("https://bcw-sandbox.herokuapp.com/api/" + user + "/todos")
			notes = res.data
		}
	}

	async function createTodo(e) {
		let res = await axios.post("https://bcw-sandbox.herokuapp.com/api/" + user + "/todos/", {
			description: window.event.target.description.value,		
		})
		notes.push(res.data)
		notes = notes
		e.target.reset()
	}

	async function markCompleted(note) {
		let res = await axios.put("https://bcw-sandbox.herokuapp.com/api/" + user + "/todos/" + note.id, { completed: note.completed })
		console.log("marked", note.id, "as completed", res)
		notes = notes
	}
	async function handleRemove(note) {
		if (await Pop.confirm("Are you sure?", "you won't be able to restore that todo", "YES", "question")) {
			notes.splice(notes.indexOf(note), 1)
			notes = notes
			let res = await axios.delete("https://bcw-sandbox.herokuapp.com/api/" + user + "/todos/" + note.id)
			console.log("removed note", res)
		}
	}

	let notes = []
	let notesLeft = 0
	$: {
		notesLeft = notes.filter(n => n.completed == false).length
	}
</script>

<main>
	<header>
		<p>Things to do</p>
		<p>{notesLeft} things left</p>
	</header>
	<hr />
	<ul>
		{#each notes as note (note.id)}
			<li>
				<div class="flex gap-2">
					<input type="checkbox" bind:checked={note.completed} on:change={() => markCompleted(note)} />
					<p>{note.description}</p>
				</div>
				<i class="mdi mdi-trash-can cursor-pointer" on:click={() => handleRemove(note)} />
			</li>

			{:else}
			<span class="flex items-center gap-4">
				<p>All Done!</p>
				<i class="mdi mdi-thumb-up text-4xl"></i>
			</span>
		{/each}
	</ul>
	<form on:submit|preventDefault={createTodo}>
		<input name="description" placeholder="Add Todo" />
		<button>+</button>
	</form>
</main>

<style>
	header {
		@apply flex justify-between;
	}
	main {
		@apply flex flex-col text-left p-4 gap-3  flex-grow md:flex-grow-0 overflow-hidden text-ellipsis text-white;
		background-color: rgba(0, 0, 0, 0.589);
		backdrop-filter: blur(10px);
		transform-origin: bottom right;
		transition: all cubic-bezier(0.075, 0.82, 0.165, 1) .3s;
	}
	main:hover{
		scale: 2;
	}
	hr {
		border-color: rgba(255, 255, 255, 0.268);
	}
	input {
		@apply text-white bg-transparent border-b-2 focus-visible:outline-0;
	}
	input::placeholder {
		color: rgba(255, 255, 255, 0.508);
	}
	li {
		@apply flex justify-between gap-3 text-ellipsis;
	}
	form {
		@apply flex gap-2;
	}
</style>
