import { appState } from "../AppState.js"
import { House } from "../Models/House.js"
import { housesService } from "../Services/HousesService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function _draw() {
	let template = ''
	appState.houses.forEach(house => template += house.CardTemplate)
	setHTML('listings', template)
	setHTML('listing-form', House.getFormTemplate())
}

function _drawActive() {
	setHTML('details', appState.activeHouse.ActiveTemplate)
}


export class HousesController {

	constructor() {
		appState.on('houses', _draw)
		appState.on('activeHouse', _drawActive)
	}

	create() {
		window.event.preventDefault()
		let form = window.event.target
		let formData = getFormData(form)
		housesService.create(formData)
	}

	async remove(ID) {
		if (await Pop.confirm('Are you sure want to delete that car')) {
			housesService.remove(ID)
		}
	}

	setActive(ID) {
		housesService.setActive(ID)
	}
	draw() {
		_draw()
	}
}