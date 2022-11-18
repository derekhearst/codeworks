import { appState } from "../AppState.js"
import { giftsService } from "../Services/GiftsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { setHTML } from "../Utils/Writer.js"

function _drawGifts() {
	let template = ""
	appState.gifts.forEach(g => (template += g.Template))
	setHTML("giftsList", template)
}

export class GiftsController {
	constructor() {
		appState.on("gifts", _drawGifts)
		giftsService.getGifts()
	}

	async postGift() {
		try {
			window.event.preventDefault()
			const form = window.event.target
			let formData = getFormData(form)
			console.log("form data = ", formData)
			await giftsService.postGif(formData)
			form.reset()
		} catch (error) {
			console.error(error)
		}
	}
	openGift(id) {
		giftsService.openGift(id)
	}
}
