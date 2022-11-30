import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const CarSchema = new Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String },
    imgUrl: { type: String, required: true, maxLength: 255 },
    color: { type: String, required: true },
    price: { type: Number, required: true, default: 1 },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
