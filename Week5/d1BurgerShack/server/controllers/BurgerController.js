import { burgersService } from "../services/BurgersService.js";
import BaseController from "../utils/BaseController.js";

export class BurgerController extends BaseController {
  constructor() {
    super("/api/burgers");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getOne)
      .post("", this.postBurger)
      .put("/:id", this.updateBurger)
      .delete("/:id", this.removeBurger);
  }

  async getAll(req, res, next) {
    try {
      let burgers = await burgersService.getAll();
      return res.send(burgers);
    } catch (error) {
      next(error);
    }
  }
  async getOne(req, res, next) {
    try {
      let burger = await burgersService.getOne(req.params.id);
      return res.send(burger);
    } catch (error) {
      next(error);
    }
  }
  async postBurger(req, res, next) {
    try {
      let burger = await burgersService.createBurger(req.body);
      return res.send(burger);
    } catch (error) {
      next(error);
    }
  }
  async updateBurger(req, res, next) {
    try {
      let burger = await burgersService.updateBurger(req.params.id, req.body);
      return res.send(burger);
    } catch (error) {
      next(error);
    }
  }
  async removeBurger(req, res, next) {
    try {
      let response = await burgersService.removeBurger(req.params.id);
      return res.send(response);
    } catch (error) {
      next(error);
    }
  }
}
