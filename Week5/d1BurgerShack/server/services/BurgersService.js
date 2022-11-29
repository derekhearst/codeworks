import { dbContext } from "../db/DbContext.js";

class BurgersService {
  constructor() {}
  async getAll() {
    return dbContext.burgers;
  }
  async getOne(id) {
    return dbContext.burgers.find((b) => b.id == id);
  }
  async createBurger(data) {
    let burger = data;
    burger.id = Math.floor(Math.random() * 5000);
    dbContext.burgers.push(burger);
    return burger;
  }
  async updateBurger(id, data) {
    let index = dbContext.burgers.findIndex((b) => b.id == id);
    let burger = dbContext.burgers.splice(index, 1);
    burger = { ...burger[0], ...data };
    dbContext.burgers.push(burger);
    return burger;
  }
  async removeBurger(id) {
    let index = dbContext.burgers.indexOf(
      dbContext.burgers.find((b) => b.id == id)
    );
    dbContext.burgers.splice(index, 1);
    return "GOTTEM";
  }
}

export const burgersService = new BurgersService();
