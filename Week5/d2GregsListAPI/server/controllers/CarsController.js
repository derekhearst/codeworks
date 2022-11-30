import { Router } from "express";
import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";

export class CarsController extends BaseController {
  constructor() {
    super("api/cars");
    this.router
      .get("", this.getAll)
      .get(":id", this.getOne)
      .post("", this.create)
      .put(":id", this.update)
      .delete(":id", this.remove);
  }

  async getAll(req, res, next) {
    try {
      let cars = await carsService.getAll();
      res.send(cars);
    } catch (error) {
      next(error);
    }
  }
  async getOne(req, res, next) {
    try {
      let car = await carsService.getOne(req.params.id);
      res.send(car);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      let car = await carsService.create(req.body);
      res.send(car);
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      let car = await carsService.update(req.params.id, req.body);
      res.send(car);
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      let car = await carsService.remove(req.params.id);
      res.send(car);
    } catch (error) {
      next(error);
    }
  }
}
