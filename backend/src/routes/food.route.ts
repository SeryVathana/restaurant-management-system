import express from "express";
import {
  getFoodById,
  getAllFoods,
  getFoodsByCategory,
  updateFoodById,
  deleteFoodById,
  createFood,
  getFoodsByTitle,
} from "../controllers/food.controller";

const foodRouter = express.Router();

foodRouter.get("/getAllFoods", getAllFoods);
foodRouter.get("/getFoodById/:id", getFoodById);
foodRouter.get("/getFoodsByCategory/:category", getFoodsByCategory);
foodRouter.get("/getFoodsByTitle/:term", getFoodsByTitle);

foodRouter.patch("/updateFoodById/:id", updateFoodById);
foodRouter.post("/createFood", createFood);
foodRouter.delete("/deleteFoodById/:id", deleteFoodById);

export default foodRouter;
