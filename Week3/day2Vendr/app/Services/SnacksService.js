import { appState } from "../AppState.js"
import { Pop } from "../Utils/Pop.js"

class SnacksService {
	orderSnack(location) {
		let snack = appState.snacks.find(s => s.location == location)
		if (snack == undefined) {
			Pop.toast("That item doesn't exist")
		} else if (snack.price < appState.money) {
			appState.money -= snack.price
			return snack.id
		}
		else {
			Pop.toast("You don't have enough money")
		}
		return null

	}

	addMoney() {
		appState.money += 5
	}
}

export const snacksService = new SnacksService