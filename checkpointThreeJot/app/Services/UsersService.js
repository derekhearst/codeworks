import { appState } from "../AppState.js"
import { User } from "../Models/User.js"
import { Pop } from "../Utils/Pop.js"
import { saveState } from "../Utils/Store.js"

function _saveUsers() {
	saveState('users', appState.users)
}

class UsersService {
	constructor() {
		appState.on('users', _saveUsers)
	}

	attemptLogin(form) {
		let foundUser = appState.users.find(u => u.userName == form.userName)
		if (foundUser != undefined) {
			if (foundUser.userPass == form.userPass) {
				appState.activeUser = foundUser
				appState.currUserNotes = appState.activeUser.userNotes
				if (foundUser.userNotes.length > 0) {
					appState.activeNote = foundUser.userNotes[0]
				}
			}
		} else {
			Pop.toast("Incorrect password or username", "error")
		}
	}

	createUser(form) {
		let foundUser = appState.users.find(u => u.userName == form.userName)
		if (foundUser) {
			Pop.toast("That user exists already", "error")
		} else {
			let newUser = new User(form)
			appState.users = [...appState.users, newUser]
			appState.activeUser = newUser
			appState.currUserNotes = appState.activeUser.userNotes
		}
	}

	saveUserNotes() {
		if (appState.currUserNotes) {
			appState.users.find(u => u.id == appState.activeUser.id).userNotes = appState.currUserNotes

			saveState('users', appState.users)
		}
	}
}

export const usersService = new UsersService()