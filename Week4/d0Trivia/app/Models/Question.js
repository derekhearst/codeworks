import { generateId } from "../Utils/generateId.js"

export class Question {
	constructor(data) {
		this.data = data
		this.answers = [...data.incorrect_answers, data.correct_answer]
		this.shuffleAnswers()
		this.id = generateId()

		this.answers = this.answers.map(a => a.replace("'", ""))
	}

	shuffleAnswers() {
		this.answers.sort((a, b) => .5 - Math.random())
	}



	get CardTemplate() {
		return /*html*/ `
<div class="flex flex-col glowHover items-center flex-auto	w-75 bg-purple-300 rounded-md shadow-purple-500">
	<h1 class="text-xl bg-purple-700 shadow-md p-2 rounded-t-md w-full text-center text-white">${this.data.question}</h1>
	<div class="flex gap-3 bg-purple-700 px-3 text-white opacity-80  rounded-b-md">
		<h1 class="text-base">${this.data.difficulty}</h1>
		<h1 class="text-base">${this.data.category}</h1>
	</div>
		<div class="flex py-3 pb-1">
		<div class="bg-lime-700 text-white rounded p-2 m-2 glow shadow-lime-400 cursor-pointer hover:scale-95" onclick="app.questionsController.guess('${this.id}','${this.answers[0]}')">${this.answers[0]}</div>
		<div class="bg-blue-700 text-white rounded p-2 m-2 glow shadow-blue-400 cursor-pointer hover:scale-95" onclick="app.questionsController.guess('${this.id}','${this.answers[1]}')">${this.answers[1]}</div>
		<div class="bg-red-700 text-white rounded p-2 m-2 glow shadow-red-400 cursor-pointer hover:scale-95" onclick="app.questionsController.guess('${this.id}','${this.answers[2]}')">${this.answers[2]}</div>
		<div class="bg-yellow-700 text-white rounded p-2 m-2 glow shadow-yellow-400 cursor-pointer hover:scale-95" onclick="app.questionsController.guess('${this.id}','${this.answers[3]}')">${this.answers[3]}</div>
	</div>
</div>
`

	}
}