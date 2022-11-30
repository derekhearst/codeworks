import { dbContext } from "../db/DbContext.js";

class CarsService {
  constructor() {}
  async getAll() {
    return await dbContext.Cars.find();
  }
  async getOne(id) {
    return await dbContext.Cars.findById(id);
  }
  async create(body) {
    return await dbContext.Cars.create(body);
  }
  async update(id, body) {
    return await dbContext.Cars.findByIdAndUpdate(id, body);
  }
  async remove(id) {
    return await dbContext.Cars.findByIdAndDelete(id);
  }
}
export const carsService = new CarsService();
