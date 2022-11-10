import { appState } from "../AppState.js"
import { Car } from "../Models/Car.js"
import { carsService } from "../Services/CarsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function _draw() {
  let template = ''
  appState.cars.forEach(car => template += car.CardTemplate)
  setHTML('listings', template)
  setHTML('listing-form', Car.GetCarFormTemplate())
}

function _drawActive() {
  setHTML('details', appState.activeCar.ActiveCarTemplate)
}


export class CarsController {

  constructor() {
    appState.on('cars', _draw)
    appState.on('activeCar', _drawActive)
  }

  create() {
    window.event.preventDefault()
    let form = window.event.target
    let formData = getFormData(form)
    console.log(formData);
    carsService.create(formData)
  }

  async remove(ID) {
    if (await Pop.confirm('Are you sure want to delete that car')) {
      carsService.remove(ID)
    }
  }

  setActive(ID) {
    carsService.setActive(ID)
  }
  draw() {
    _draw()
  }
}