import { housesService } from "../services/HousesService";
import BaseController from "../utils/BaseController.js";

export class HousesController extends BaseController {
  constructor() {
    super("api/houses");
    this.router
      .get("", this.getAll)
      .get(":id", this.getOne)
      .post("", this.create)
      .put(":id", this.update)
      .delete(":id", this.remove);
  }

  async getAll(req, res, next) {
    try {
      let houses = await housesService.getAll();
      res.send(houses);
    } catch (error) {
      next(error);
    }
  }
  async getOne(req, res, next) {
    try {
      let house = await housesService.getOne(req.params.id);
      res.send(house);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      let house = await housesService.create(req.body);
      res.send(house);
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      let house = await housesService.update(req.params.id, req.body);
      res.send(house);
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      let house = await housesService.remove(req.params.id);
      res.send(house);
    } catch (error) {
      next(error);
    }
  }
}
