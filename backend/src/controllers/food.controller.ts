import { Request, Response } from "express";
import { sendResponse } from "../utils/forward";
import { ERROR_CODE, ERROR_MESSAGE, SUCCESS_CODE, SUCCESS_MESSAGE } from "../enums/enum";
import { createFoodSchema, updateFoodSchema } from "../validations/food.validate";
import { ZodError } from "zod";
import { FoodModel } from "../models/food.model";
import { IfAny, ObjectId, isObjectIdOrHexString } from "mongoose";
import { IFood } from "../interfaces/interface";
import { match } from "assert";

export const getAllFoods = async (req: Request, res: Response) => {
  try {
    const { search, sorted } = req.query;

    let query = FoodModel.find();

    if (search) {
      query = query.find({ title: { $regex: search, $options: "i" } });
    }

    const foods: any = await query.exec();

    let result: any;
    if (sorted == "true") {
      const breakfast = foods.filter((food: any) => food.categories.includes("breakfast"));
      const lunch = foods.filter((food: any) => food.categories.includes("lunch"));
      const dinner = foods.filter((food: any) => food.categories.includes("dinner"));

      result = { breakfast, lunch, dinner };
    }

    return sendResponse(res, SUCCESS_CODE.OK, "", sorted == "true" ? result : foods);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const getFoodById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const isObjId = isObjectIdOrHexString(id);
    if (!isObjId) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.FOOD_NOT_FOUND);

    const food = await FoodModel.findById(id);
    if (!food) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.FOOD_NOT_FOUND);

    return sendResponse(res, SUCCESS_CODE.OK, "", food);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const getFoodsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const foods = await FoodModel.find({ categories: category });

    return sendResponse(res, SUCCESS_CODE.OK, "", foods);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const createFood = async (req: Request, res: Response) => {
  try {
    const validatedInput = createFoodSchema.parse(req.body);

    if (validatedInput.price < 0) {
      return sendResponse(res, ERROR_CODE.INVALID_INPUT, ERROR_MESSAGE.INVALID_INPUT);
    }

    await FoodModel.create(validatedInput);

    return sendResponse(res, SUCCESS_CODE.CREATED, SUCCESS_MESSAGE.CREATED);
  } catch (error: any) {
    if (error instanceof ZodError) {
      console.log(error);
      return sendResponse(res, ERROR_CODE.INVALID_INPUT, error.errors[0].message);
    }

    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const updateFoodById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const isObjId = isObjectIdOrHexString(id);
    if (!isObjId) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.FOOD_NOT_FOUND);

    const validatedInput = updateFoodSchema.parse(req.body);
    const { title, description, img_url, price, categories } = validatedInput;

    const food = await FoodModel.findById(id);
    if (!food) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.FOOD_NOT_FOUND);

    food.title = title || food.title;
    food.description = description || food.description;
    food.img_url = img_url || food.img_url;
    food.price = price || food.price;
    food.categories = categories || food.categories;

    await food.save();

    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.UPDATED);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return sendResponse(res, ERROR_CODE.INVALID_INPUT, error.errors[0].message);
    }

    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const deleteFoodById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const isObjId = isObjectIdOrHexString(id);
    if (!isObjId) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.FOOD_NOT_FOUND);

    const food = await FoodModel.findById(id);
    if (!food) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.FOOD_NOT_FOUND);

    await food.deleteOne();

    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.DELETED);
  } catch (error: any) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};
