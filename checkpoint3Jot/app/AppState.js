import { Note } from "./Models/Note.js"
import { User } from "./Models/User.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Note').Note[]} */
  currUserNotes = []
  /** @type {import('./Models/User').User[]} */
  users = loadState('users', [User])


  activeNote = null
  activeUser = null
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