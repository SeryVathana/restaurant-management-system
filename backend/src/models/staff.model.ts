import mongoose from "mongoose";
const Schema = mongoose.Schema;

const staffSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    phone_number: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    job_title: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    work_shifts: [
      {
        type: String,
        required: true,
      },
    ],
    hire_date: {
      type: Date,
      default: new Date(),
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export const StaffModel = mongoose.model("staffs", staffSchema);
