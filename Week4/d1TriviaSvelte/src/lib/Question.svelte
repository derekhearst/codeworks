<script>
	import { createEventDispatcher } from "svelte"
	export let data
	let answers = [...data.incorrect_answers, data.correct_answer]
	let colors = ["bg-blue-700", "bg-lime-700", "bg-red-700", "bg-yellow-700"]
	let colors2 = ["shadow-blue-700", "shadow-lime-700", "shadow-red-700", "shadow-yellow-700"]

	answers.sort((a, b) => 0.5 - Math.random())
	const dispatch = createEventDispatcher()
	function checkAnswer(a) {
		console.log("submitteed answer", a)
		console.log("correct answer ", data.correct_answer)
		if (a == data.correct_answer) {
			console.log("did it!")
			dispatch("completed", { question: data.question })
		} else {
			dispatch("bad")
		}
	}
</script>

<main class="bg-purple-900 rounded-md shadow-purple-900 glowHover text-white  flex flex-col items-center flex-auto">
	<h1 class="text-2xl w-full rounded text-center p-2 shadow-sm bg-purple-700">{@html data.question}</h1>
	<div class="flex gap-3 items-center bg-purple-700 px-5 rounded-b-lg opacity-80">
		<h1 class="">{data.category}</h1>
		<h1 class="uppercase">{data.difficulty}</h1>
	</div>
	<div class="flex gap-3 py-2 pt-6 justify-center">
		{#each answers as answer, index}
			<button class="{colors[index]} text-white p-2 {colors2[index]} glow  hover:scale-95 px-3" on:click={() => checkAnswer(answer)}>{@html answer}</button>
		{/each}
	</div>
</main>
