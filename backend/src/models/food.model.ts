import mongoose from "mongoose";
const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    title_kh: {
      type: String,
      required: false,
      index: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    img_url: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export const FoodModel = mongoose.model("foods", foodSchema);
