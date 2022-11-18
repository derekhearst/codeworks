export class GiphyGif {
	constructor(data) {
		this.tag = data.title
		this.url = data.images.downsized.url
	}

	get DisplayTemplate() {
		return `<img class="giphyGif" onclick="app.giphyController.setGif('${this.url}')" src=${this.url} alt=${this.tag}></img>`
	}
}
