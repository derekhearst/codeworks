import { appState } from "../AppState.js"
import { personService } from "../Services/PersonService.js";

export class PersonController {
	constructor() {
		this.drawCharacters()
	}

	drawCharacters() {
		let peoplePlace = document.getElementById("peoplePlace")
		let template = ''
		appState.people.forEach(element => {
			template += element.Template
		});
		peoplePlace.innerHTML = template
	}

	decreaseScore(name) {
		personService.increaseScore(name)
		this.drawCharacters()

	}
	increaseScore(name) {
		personService.decreaseScore(name)
		this.drawCharacters()

	}

	createCharacter() {
		window.event.preventDefault()
		let form = window.event.target
		personService.createPerson(form.name.value)
		form.reset()
		this.drawCharacters()
	}
}