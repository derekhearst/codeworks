import { appState } from "../AppState.js";
import { Question } from "../Models/Question.js";
import { questionsService } from "../Services/QuestionsService.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML, setText } from "../Utils/Writer.js";

function _drawQuestions() {
	let template = ''
	appState.questions.forEach(q => template += q.CardTemplate)
	setHTML('questionList', template)
}

function _drawScoreLives() {
	setText('scoreLives', `Score : ${appState.score} | Lives : ${appState.lives}`)
}


export class QuestionsController {
	constructor() {
		appState.on("questions", _drawQuestions)
		appState.on("score", _drawScoreLives)
		appState.on("lives", _drawScoreLives)
		_drawScoreLives()
		questionsService.getData()
		// _drawQuestions()
	}

	guess(id, answer) {
		if (questionsService.guess(id, answer)) {
			Pop.toast("You did it!", "success", "center")
		}
		else {
			Pop.toast("HAHAA Guess again", "error", "center")
		}
	}


}