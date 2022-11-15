import { appState } from "../AppState.js"
import { Question } from "../Models/Question.js"
import { Pop } from "../Utils/Pop.js"

async function _getData() {

}

class QuestionsService {
	constructor() {
	}

	async getData() {
		// debugger
		const res = await axios.get("https://opentdb.com/api.php?amount=30&type=multiple")
		console.log('my res data', res.data);
		appState.questions = res.data.results.map(q => new Question(q))
		console.log(appState.questions)
	}

	guess(id, answer) {
		let q = appState.questions.find(q => q.id == id)
		if (q) {
			if (q.data.correct_answer == answer) {
				appState.questions.splice(appState.questions.indexOf(q), 1)
				appState.emit("questions")
				appState.score++
				return true
			} else {
				appState.lives--
				return false
			}
		} else {
			console.error("That id couldn't be found")
		}

	}
}

export const questionsService = new QuestionsService()