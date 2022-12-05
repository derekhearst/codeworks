import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"
import { saveState } from "../Utils/Store.js"
import { Note } from "./Note.Js"

export class User {
	constructor(data) {
		this.id = data.id || generateId()
		this.userName = data.userName
		this.userPass = data.userPass
		if (data.userNotes) {
			this.userNotes = data.userNotes.map(n => new Note(n))
		}
		else {
			this.userNotes = []
		}
	}
}