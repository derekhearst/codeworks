import { appState } from "../AppState.js"
import { Person } from "../Models/Person.js"
// import { Person } from "../Models/Person"

class PersonService {
	increaseScore(name) {
		appState.people.find(p => p.name == name).score--

	}
	decreaseScore(name) {
		appState.people.find(p => p.name == name).score++
	}

	createPerson(person) {
		appState.people.push(new Person('https://i.pinimg.com/236x/98/3c/79/983c79711b89d13179e23794cb57010f--question-mark-new-trends.jpg', person))
	}
}

export const personService = new PersonService()