import mongoose from "mongoose";
//

class DbContext {
  burgers = [
    { name: "yo", desc: "derek" },
    {
      name: "yo2",
      desc: "yo3",
    },
    {
      name: "yo35",
      desc: "yo3",
    },
    {
      name: "yo2",
      desc: "yoasdf3",
    },
  ];
}

export const dbContext = new DbContext();
