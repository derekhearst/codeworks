import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"

export class Snack {
	constructor(name, price, image) {
		this.name = name
		this.price = price
		this.location = ''
		this.id = generateId()
		if (image == null) {
			this.image = "https://cdn.gardengrocer.com/attachments/photos/high_res/4786.png?9573"
		} else {
			this.image = image
		}
	}

	setLocation() {
		let index = appState.snacks.findIndex(s => s.id == this.id)
		let line = Math.floor(index / 4)
		let letter = ''
		switch (index % 4) {
			case 0:
				letter = 'A'
				break
			case 1:
				letter = 'B'
				break
			case 2:
				letter = 'C'
				break
			case 3:
				letter = 'D'
				break

		}
		this.location = ++line + letter
	}

	get Template() {
		return `
		<div class="item">
       		<img class="itemImage"  id="${this.id}" src="${this.image}">
    		<div class="price">$${this.price}</div>
       		<div class="label">${this.location}</div>
      	</div>`
	}
}