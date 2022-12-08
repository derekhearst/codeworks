import { appState } from "../AppState.js"
import { Note } from "../Models/Note.js"
import { notesService } from "../Services/NotesService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML, setText } from "../Utils/Writer.js"


function _drawNoteList() {
	if (appState.currUserNotes) {
		let temp = ''
		appState.currUserNotes.forEach(n => temp += n.ListTemplate)
		setHTML('notesList', temp)
		setText('jotCount', appState.currUserNotes.length)
	} else {
		console.log("attempted to load notes while no notes saved")
	}
}

function _drawActiveNote() {
	if (appState.activeNote) {
		setHTML('activeNoteDisplay', appState.activeNote.ActiveTemplate)
	} else {
		setHTML('activeNoteDisplay', Note.StaticActiveTemplate)
	}

}

export class NotesController {
	constructor() {
		appState.on("currUserNotes", _drawNoteList)
		appState.on("activeNote", _drawActiveNote)
	}

	toggleNoteList() {
		let noteDisplayElm = document.getElementById("noteDisplay")
		if (noteDisplayElm.style.visibility == "visible") {
			noteDisplayElm.style.visibility = "hidden"
		}
		else {
			noteDisplayElm.style.visibility = "visible"
		}
	}

	saveNote(id) {
		let noteText = document.getElementById(appState.activeNote.id).value
		notesService.saveNote({ id, noteText })
		appState.emit('activeNote')
	}

	addNote() {
		window.event.preventDefault()
		let data = getFormData(window.event.target)
		notesService.addNote(data)
		window.event.target.reset()
	}

	async deleteNote(id) {
		if (await Pop.confirm(`Do you really want to delete ${appState.activeNote.title}`)) {
			notesService.deleteNote(id)
		}
	}

	selectNote(id) {
		notesService.setActive(id)
		this.toggleNoteList()
	}

}