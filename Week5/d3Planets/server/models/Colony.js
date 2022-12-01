import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ColonySchema = new Schema(
  {
    name: { type: String, required: true },
    population: { type: Number, required: true },
    atmosphere: { type: Boolean, required: true },
    planetId: { type: Schema.Types.ObjectId, ref: "Planet" },
    speciesId: { type: Schema.Types.ObjectId, ref: "Species" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

ColonySchema.virtual("planet", {
  localField: "planetId",
  ref: "Planet",
  foreignField: "_id",
  justOne: true,
});

ColonySchema.virtual("species", {
  localField: "speciesId",
  ref: "Species",
  foreignField: "_id",
  justOne: true,
});
