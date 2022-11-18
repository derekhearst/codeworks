import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
	/** @type {import('./Models/GiphyGif.js').GiphyGif[]} */
	gifs = []
	/** @type {import('./Models/Gift.js').Gift[]} */
	gifts = []
}

export const appState = new Proxy(new AppState(), {
	get(target, prop) {
		isValidProp(target, prop)
		return target[prop]
	},
	set(target, prop, value) {
		isValidProp(target, prop)
		target[prop] = value
		target.emit(prop, value)
		return true
	},
})
