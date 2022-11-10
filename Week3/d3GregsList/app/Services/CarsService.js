import { appState } from "../AppState.js";
import { Car } from "../Models/Car.js";
import { saveState } from "../Utils/Store.js";


class CarsService {
  setActive(ID) {
    appState.activeCar = appState.cars.find(c => c.id == ID)
  }
  create(formData) {
    let newCar = new Car(formData)
    appState.cars = [...appState.cars, newCar]
    saveState('cars', appState.cars)
  }
  remove(ID) {
    let filteredArray = appState.cars.filter(c => c.id != ID)
    appState.cars = filteredArray
    console.log('New array in AppState:', appState.cars);
    saveState('cars', appState.cars)
  }

}
export const carsService = new CarsService()