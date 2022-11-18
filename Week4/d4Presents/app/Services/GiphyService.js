import { appState } from "../AppState.js"
import { GiphyGif } from "../Models/GiphyGif.js"

class GiphyService {
	async getGifs() {
		console.log("getting gifs")
		let res = await axios.get("https://api.giphy.com/v1/gifs/trending", { params: { api_key: "MMeuX1kitbCppFxppi6sspmUVGc0MBGb", limit: 25, rating: "pg" } })
		appState.gifs = res.data.data.map(g => new GiphyGif(g))
		console.log("Got new gifs", appState.gifs)
	}

	async getFilteredGifs(filter) {
		let res = await axios.get("https://api.giphy.com/v1/gifs/search", { params: { api_key: "MMeuX1kitbCppFxppi6sspmUVGc0MBGb", limit: 10, rating: "pg", lang: "en", q: filter } })
		appState.gifs = res.data.data.map(g => new GiphyGif(g))
		console.log("Got new filtered gifs", appState.gifs)
	}
}
export const giphyService = new GiphyService()
