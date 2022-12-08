import { generateId } from "../Utils/generateId.js"



export class Note {
	constructor(data) {
		this.id = data.id || generateId()
		this.title = data.title
		this.color = data.color
		if (data.timeCreated) {

			this.timeCreated = new Date(data.timeCreated)
			this.timeUpdated = new Date(data.timeUpdated)
		} else {
			this.timeCreated = new Date()
			this.timeUpdated = new Date()
		}
		this.noteText = data.noteText || ""
	}

	get ActiveTemplate() {
		return ` 
	<div class="noteDetails">
        <h3 style="color:${this.color}">${this.title}</h3>
        <p>Created at: ${this.timeCreated.toLocaleDateString()} ${this.timeCreated.toLocaleTimeString()}</p>
        <p>Updated at: ${this.timeUpdated.toLocaleDateString()} ${this.timeUpdated.toLocaleTimeString()} </p>
        <p>Words: ${this.WordCount}, Characters:${this.CharCount}</p>
		<button onclick="app.notesController.saveNote('${this.id}')">Save</button>
		<button style="background-color: red" onclick="app.notesController.deleteNote('${this.id}')">Delete</button>
    </div>
    <textarea id='${this.id}' value="">${this.noteText}</textarea>`
	}

	get WordCount() {
		return this.noteText.split(' ').length
	}

	get CharCount() {
		return this.noteText.split('').length
	}



	static get StaticActiveTemplate() {
		return /*html*/`
		<div>
			<h1>You have no notes yet!</h1>
			<form class="d-flex align-items-center gap-3" onsubmit="app.notesController.addNote()">
				<input class="noteNameInput" id="title" name="title" placeholder="Create Note" required minlength="3" maxlength="15">
				<input class="noteColorInput" id="color" name="color" required type="color">
				<button class="noteformAdd">
				<i class="mdi mdi-plus"></i>
				<div>add</div>
				</button>
			</form>
		</div>`
	}

	get ListTemplate() {

		return /*html*/ `<button class="noteButton" style="color:${this.color}" onclick="app.notesController.selectNote('${this.id}')">${this.title}</button>`
	}
}