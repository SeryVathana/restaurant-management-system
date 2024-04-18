import express from "express";
import {
  getFoodById,
  getAllFoods,
  getFoodsByCategory,
  updateFoodById,
  deleteFoodById,
  createFood,
} from "../controllers/food.controller";

const foodRouter = express.Router();

foodRouter.get("/getAllFoods", getAllFoods);
foodRouter.get("/getFoodById/:id", getFoodById);
foodRouter.get("/getFoodsByCategory/:category_title", getFoodsByCategory);

foodRouter.patch("/updateFoodById/:id", updateFoodById);
foodRouter.post("/createFood", createFood);
foodRouter.delete("/deleteFoodById/:id", deleteFoodById);

export default foodRouter;
