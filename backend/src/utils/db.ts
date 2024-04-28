import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// const dbUri = process.env.DB_URI;

async function connectToDB() {
  return mongoose
    .connect("mongodb://localhost:27017/res-man-db")
    .then(() => {
      console.log("Database connected.");
    })
    .catch((error) => {
      console.log("Error connecting to database.", error);
      process.exit(1);
    });
}

export default connectToDB;
