import { appState } from "../AppState.js"
import { Gift } from "../Models/Gift.js"

class GiftsService {
	async postGif(formData) {
		console.log(formData.url)
		let res = await axios.post("https://bcw-sandbox.herokuapp.com/api/gifts	", formData)
		console.log(res.data)
		this.getGifts()
	}

	async getGifts() {
		let res = await axios.get("https://bcw-sandbox.herokuapp.com/api/gifts")
		console.log("Gotten gifts", res)
		appState.gifts = res.data.map(g => new Gift(g))
	}
	async openGift(id) {
		let openGift = appState.gifts.find(f => f.id == id)
		let res = await axios.put("https://bcw-sandbox.herokuapp.com/api/gifts/" + id, { opened: true })
		console.log("Opened on server", res)
		openGift.opened = true
		console.log(id)
		appState.emit("gifts")
	}
}

export const giftsService = new GiftsService()
