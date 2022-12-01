import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class GalaxiesService {
  async find() {
    const values = await dbContext.Galaxies.find().populate();
    return values;
  }

  async create(galaxyData) {
    const galaxy = await dbContext.Galaxies.create(galaxyData);
    galaxy.populate();
    return galaxy;
  }
}

export const galaxiesService = new GalaxiesService();
