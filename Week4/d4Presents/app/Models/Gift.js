export class Gift {
	constructor(data) {
		this.url = data.url
		this.tag = data.tag
		this.opened = data.opened
		this.id = data.id
	}

	get Template() {
		if (this.opened) {
			return `<img class="col-3" src="${this.url}" title="${this.tag}" alt="${this.tag}"></img>`
		} else {
			return `<img class="col-3" onclick="app.giftsController.openGift('${this.id}')" src="https://dkstatic.s3.amazonaws.com/Creative-Development/2019/DFS/cp-eightDaysOfGifts/Gift-01.png" title="${this.tag}" alt="${this.tag}"></img>`
		}
	}
}
