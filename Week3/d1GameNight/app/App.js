import { PersonController } from "./Controllers/PersonController.js";

class App {
  personController = new PersonController();
}

window["app"] = new App();
