import { Snack } from "./Models/Snack.js"
import { Value } from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  money = 0
  snacks = [
    new Snack("m&m", 1, null),
    new Snack("Skittles", 2, 'https://www.skittles.com/cdn-cgi/image/width=580,height=580,f=auto,quality=90/sites/g/files/fnmzdf586/files/2022-03/aadb4a6863ba24d78fad341c43df7749.png'),
    new Snack("Reeses", 3, 'https://assets.stickpng.com/images/58d2a5fedc164e9dd9e668e3.png'),
    new Snack("Lolipop", 1, 'https://assets.stickpng.com/images/580b57fbd9996e24bc43c0c1.png'),
    new Snack("Snickers", 2, 'https://www.snickers.com/sites/g/files/fnmzdf616/files/migrate-product-files/izvmrvm045witiec2opc.png'),
    new Snack("Pop Tarts", 4, 'https://www.pngmart.com/files/13/Pop-Tarts-PNG-Transparent-Image.png'),
    new Snack("Chips", 3, 'https://www.pngkey.com/png/full/110-1101283_chips-bag-png-clipart-freeuse-library-lays-salt.png'),
    new Snack("Duck", 10, 'https://d1e00ek4ebabms.cloudfront.net/production/71611bc2-1cd9-484d-9a64-5fa70091c4e8.png'),

  ]

}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
