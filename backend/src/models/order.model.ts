import mongoose, { Schema } from "mongoose";
import { string } from "zod";

const orderSchema = new Schema({
  foods: [
    {
      type: Object,
      required: true,
    },
  ],
  comment: {
    type: String,
    required: false,
  },
  location_url: {
    type: String,
    required: true,
  },
  order_status: {
    type: String,
    default: "pending",
  },
});

export const OrderModel = mongoose.model("orders", orderSchema);
