import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const GalaxySchema = new Schema(
  {
    name: { type: String, required: true },
    stars: { type: String, required: true },
    planetIds: [{ type: Schema.Types.ObjectId, ref: "Planet" }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

GalaxySchema.virtual("planets", {
  localField: "planetIds",
  ref: "Planet",
  foreignField: "_id",
});
