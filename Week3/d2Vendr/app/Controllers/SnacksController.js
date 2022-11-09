import { appState } from "../AppState.js"
import { snacksService } from "../Services/SnacksService.js"
import { setHTML, setText } from "../Utils/Writer.js"

export class SnacksController {
	constructor() {
		appState.on('snacks', _drawSnacks)
		appState.on('money', _drawMoney)
		_drawSnacks()
		this.drawDisplay()
	}

	row = '1'
	subRow(row) {
		this.row = row
		this.drawDisplay()
	}
	col = 'A'
	subCol(col) {
		this.col = col
		this.drawDisplay()
	}

	order() {
		let ID = snacksService.orderSnack(this.row + this.col)
		if (ID != null) {
			let item = document.getElementById(ID)
			let tray = document.getElementById('trayArea')
			let offset = tray.getBoundingClientRect().y - item.getBoundingClientRect().y
			offset += (tray.clientHeight / 2) - 25
			item.style.transform = `translate(0px, ${offset}px)`
			item.style.transition = 'all 1s ease'
			item.classList.add("purchased")
			setTimeout(() => {
				item.style.transform = `translate(0px, 0px)`
			}, 10000)
		}
	}


	drawDisplay() {
		setText('display', this.row + this.col)
	}

	addMoney() {
		snacksService.addMoney()
	}



}

function _drawMoney() {
	setText('money', appState.money)
}

function _drawSnacks() {
	let template = ''
	appState.snacks.forEach(s => {
		s.setLocation()
		template += s.Template
	})
	setHTML("snacksArea", template)
}