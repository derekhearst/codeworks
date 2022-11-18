import { appState } from "../AppState.js"
import { giphyService } from "../Services/GiphyService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { setHTML } from "../Utils/Writer.js"

function _drawGifs() {
	let template = ``
	appState.gifs.forEach(g => (template += g.DisplayTemplate))

	setHTML("newGifs", template)
}

export class GiphyController {
	constructor() {
		giphyService.getGifs()
		appState.on("gifs", _drawGifs)
	}

	getFiltered(e) {
		window.event.preventDefault()
		let data = getFormData(window.event.target)
		console.log(data)
		giphyService.getFilteredGifs(data.filter)
	}

	setGif(gifUrl) {
		let gif = appState.gifs.find(g => g.url == gifUrl)
		console.log(gif)
		document.getElementById("tag").value = gif.tag
		document.getElementById("url").value = gif.url
	}
}
