import express from 'express';
import { addNewFood, deleteFoodById, getAllFoods, getFoodById, updateFoodById } from '../controllers/food.controller';

const route = express.Router();

route.get('/', getAllFoods);
route.get('/:id', getFoodById);
route.post('/', addNewFood);
route.delete('/:id', deleteFoodById);
route.patch('/:id', updateFoodById);

export default route;
