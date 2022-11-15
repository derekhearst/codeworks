<script lang="ts">
	import Question from "./lib/Question.svelte"
	import QuestionClass from "./lib/Question.svelte"

	let questions = []

	async function getData(url) {
		const res = await axios.get(url)
		console.log("Await Done", res.data.results)
		questions = res.data.results
	}

	let score = 0
	let lives = 5
	getData("https://opentdb.com/api.php?amount=10&type=multiple")

	function subLife() {
		if (lives <= 1) {
			window.alert(`Your top score is: ${score}!`)
			lives = 5
			score = 0
		} else {
			lives--
		}
	}
	function complete(event) {
		console.log(event)
		let q = questions.find(q => q.question == event.detail.question)
		if (q) {
			console.log("found Q")
			questions.splice(questions.indexOf(q), 1)
			questions = questions
			if (questions.length < 1) {
				getData("https://opentdb.com/api.php?amount=10&type=multiple")
				lives = 5
			}
			score++
		} else {
			console.log("cant find that question")
		}
	}
	// console.log("Data waiting for", data.data.results);
</script>

<body class="min-h-screen flex flex-col items-center">
	<header class="flex justify-center">
		<img class="-my-28" src="https://crossfit718.com/wp-content/uploads/2018/10/game-night-logo-700x467.png" />
	</header>
	<h1 class="bg-purple-900 w-auto p-3 text-white text-xl font-semibold rounded-md">
		Score = {score} Lives= {lives}
	</h1>
	<main class="flex flex-wrap gap-6 p-12">
		{#each questions as data (data.question)}
			<Question {data} on:completed={complete} on:bad={subLife} />
		{/each}
	</main>
</body>

<style>
	body {
		background-image: url(https://media.istockphoto.com/id/1144130818/vector/purple-brick-wall.jpg?s=612x612&w=0&k=20&c=F2TpL5aW5bdHgu0ApjtTJNBzJKlMhKxEumCvNc1wru8=);
		background-size: cover;
	}
</style>
