import { appState } from "../AppState.js"
import { Note } from "../Models/Note.Js"
import { Pop } from "../Utils/Pop.js"
import { saveState } from "../Utils/Store.js"
import { usersService } from "./UsersService.js"



class NotesService {
	addNote(form) {
		let existingNote = appState.currUserNotes.find(n => n.title == form.title)
		if (existingNote) {
			Pop.toast("A note with that name already exists!", "error")
		} else {
			let newNote = new Note(form)
			appState.currUserNotes = [...appState.currUserNotes, newNote]
			appState.activeNote = newNote
			Pop.toast("created new note!", "success")
		}
	}

	deleteNote(id) {
		let note = appState.currUserNotes.find(n => n.id == id)
		if (note) {
			appState.currUserNotes = appState.currUserNotes.filter(n => n.id != id)
			if (appState.currUserNotes.length > 0) {
				appState.activeNote = appState.currUserNotes[0]
			} else {
				appState.activeNote = null
			}
			usersService.saveUserNotes()
		} else {
			Pop.toast("That ID does not exist!", "error")
		}
	}

	saveNote(form) {
		if (!form.noteText) { Pop.toast("You didn't submit text in the form submission") }
		let note = appState.currUserNotes.find(n => n.id == form.id)
		if (note) {
			note.noteText = form.noteText
			note.timeUpdated = new Date
			usersService.saveUserNotes()
		} else {
			Pop.toast("A note with that ID doesn't exist")
		}
	}

	setActive(id) {
		let note = appState.currUserNotes.find(n => n.id == id)
		if (note) {
			appState.activeNote = note
		} else {
			Pop.toast("A note with that ID doesn't exist")
		}
	}
}

export const notesService = new NotesService()