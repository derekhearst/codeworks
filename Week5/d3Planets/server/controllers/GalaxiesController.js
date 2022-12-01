import { galaxiesService } from "../services/GalaxiesService.js";
import BaseController from "../utils/BaseController";

export class GalaxiesController extends BaseController {
  constructor() {
    super("api/galaxies");
    this.router.get("", this.getAll).post("", this.create);
  }

  async getAll(req, res, next) {
    try {
      let galaxies = await galaxiesService.find();
      return res.send(galaxies);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let galaxies = await galaxiesService.create(req.body);
      return res.send(galaxies);
    } catch (error) {
      next(error);
    }
  }
}
