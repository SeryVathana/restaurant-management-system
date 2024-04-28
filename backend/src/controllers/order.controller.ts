import { Request, Response } from "express";
import { sendResponse } from "../utils/forward";
import { ERROR_CODE, ERROR_MESSAGE, SUCCESS_CODE, SUCCESS_MESSAGE } from "../enums/enum";
import { ILoggedInRequest } from "../interfaces/interface";
import { createOrderSchema } from "../validations/order.validate";
import { ZodError } from "zod";
import { OrderModel } from "../models/order.model";
import { isObjectIdOrHexString } from "mongoose";
import { FoodModel } from "../models/food.model";

export const createOrder = async (req: ILoggedInRequest, res: Response) => {
  const user = req.user;
  try {
    if (!user) return sendResponse(res, ERROR_CODE.UNAUTHORIZED, ERROR_MESSAGE.UNAUTHORIZED);

    const validatedInput = createOrderSchema.parse(req.body);

    const foods = validatedInput.foods;
    for (let i = 0; i < foods.length; i++) {
      const id = foods[i].food_id;

      const isObjId = isObjectIdOrHexString(id);
      if (!isObjId) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.FOOD_NOT_FOUND);

      const food = await FoodModel.findById(id);
      if (!food) {
        return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.FOOD_NOT_FOUND);
      }
    }

    await OrderModel.create({ user_id: user._id, order_status: "pending", ...validatedInput });

    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.CREATED);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error);
      return sendResponse(res, ERROR_CODE.INVALID_INPUT, ERROR_MESSAGE.INVALID_INPUT);
    }

    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};
