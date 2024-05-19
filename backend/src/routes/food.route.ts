import express from "express";
import { createFood, deleteFoodById, getAllFoods, getFoodById, getFoodsByCategory, updateFoodById } from "../controllers/food.controller";

const foodRouter = express.Router();

foodRouter.get("/getAllFoods", getAllFoods);
foodRouter.get("/getFoodById/:id", getFoodById);
foodRouter.get("/getFoodsByCategory/:category", getFoodsByCategory);
foodRouter.put("/updateFoodById/:id", updateFoodById);
foodRouter.post("/createFood", createFood);
foodRouter.delete("/deleteFoodById/:id", deleteFoodById);

export default foodRouter;
