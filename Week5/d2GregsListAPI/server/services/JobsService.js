import { dbContext } from "../db/DbContext.js";

class JobsService {
  constructor() {}
  async getAll() {
    return await dbContext.Jobs.find();
  }
  async getOne(id) {
    return await dbContext.Jobs.findById(id);
  }
  async create(body) {
    return await dbContext.Jobs.create(body);
  }
  async update(id, body) {
    return await dbContext.Jobs.findByIdAndUpdate(id, body);
  }
  async remove(id) {
    return await dbContext.Jobs.findByIdAndDelete(id);
  }
}
export const jobsService = new JobsService();
