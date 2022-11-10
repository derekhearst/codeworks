import { appState } from "../AppState.js";
import { House } from "../Models/House.js";
import { saveState } from "../Utils/Store.js";


class HousesService {
	setActive(ID) {
		appState.activeHouse = appState.houses.find(c => c.id == ID)
	}
	create(formData) {
		let newHouse = new House(formData)
		appState.houses = [...appState.houses, newHouse]
		saveState('houses', appState.houses)
	}
	remove(ID) {
		let filteredArray = appState.houses.filter(c => c.id != ID)
		appState.houses = filteredArray
		console.log('New array in AppState:', appState.houses);
		saveState('houses', appState.houses)
	}

}
export const housesService = new HousesService()