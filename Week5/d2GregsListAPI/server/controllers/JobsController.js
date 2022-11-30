import { jobsService } from "../services/JobsService.js";
import BaseController from "../utils/BaseController.js";

export class JobsController extends BaseController {
  constructor() {
    super("api/jobs");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getOne)
      .post("", this.create)
      .put("/:id", this.update)
      .delete("/:id", this.remove);
  }

  async getAll(req, res, next) {
    try {
      let jobs = await jobsService.getAll();
      res.send(jobs);
    } catch (error) {
      next(error);
    }
  }
  async getOne(req, res, next) {
    try {
      let job = await jobsService.getOne(req.params.id);
      res.send(job);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      let job = await jobsService.create(req.body);
      res.send(job);
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      let job = await jobsService.update(req.params.id, req.body);
      res.send(job);
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      let job = await jobsService.remove(req.params.id);
      res.send(job);
    } catch (error) {
      next(error);
    }
  }
}
