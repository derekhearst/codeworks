import { NotesController } from "./Controllers/NotesController.js";
import { UsersController } from "./Controllers/UsersController.js";

class App {
  usersController = new UsersController()
  notesController = new NotesController()
}

window["app"] = new App();
