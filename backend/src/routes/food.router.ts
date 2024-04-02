import express from "express";
import { addNewFood, deleteFoodById, getAllFoods, getFoodById, updateFoodById } from "../controllers/food.controller";

const route = express.Router();

route.get("/getAllFoods", getAllFoods);
route.get("/getFoodById", getFoodById);
route.post("/addNewFood", addNewFood);
route.delete("/deleteFoodById", deleteFoodById);
route.put("/updateFoodById", updateFoodById);

export default route;
