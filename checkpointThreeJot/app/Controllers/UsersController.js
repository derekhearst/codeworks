import { appState } from "../AppState.js";
import { User } from "../Models/User.js";
import { usersService } from "../Services/UsersService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { setHTML } from "../Utils/Writer.js";

function _toggleLogin() {
	let loginSection = document.getElementById("loginMenu")
	if (appState.activeUser) {
		loginSection.style.visibility = 'hidden'
	} else {
		loginSection.style.visibility = 'visible'
	}
}

export class UsersController {
	constructor() {
		// _toggleLogin()
		appState.on('activeUser', _toggleLogin)
	}

	attemptLogin() {
		window.event.preventDefault()
		let data = getFormData(window.event.target)
		usersService.attemptLogin(data)
	}

	createUser() {
		window.event.preventDefault()
		let data = getFormData(window.event.target)
		usersService.createUser(data)

	}

	logOut() {
		appState.activeUser = null
		appState.activeNote = null
	}
}