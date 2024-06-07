import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// const dbUri = process.env.DB_URI;

async function connectToDB() {
  return mongoose
    .connect("mongodb+srv://seryvathana:K0mLAKPldcVgRaoF@cluster0.dlz7mru.mongodb.net/my-database")
    .then(() => {
      console.log("Database connected.");
    })
    .catch((error) => {
      console.log("Error connecting to database.", error);
      process.exit(1);
    });
}

export default connectToDB;
