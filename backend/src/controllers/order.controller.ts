import { Request, Response } from "express";
import { connect } from "../configs/db";
import { sendResponse } from "../utils/forward";
import {
  ERROR_CODE,
  ERROR_MESSAGE,
  SUCCESS_CODE,
  SUCCESS_MESSAGE,
} from "../enums/enum";
import { ILoggedInRequest } from "../interfaces/interface";
import { createOrderSchema } from "../validations/order.validate";
import { ZodError } from "zod";

export const createOrder = async (req: ILoggedInRequest, res: Response) => {
  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );

  try {
    const validatedInput = createOrderSchema.parse(req.body);
    const { foods, location_url } = validatedInput;

    if (!req.user)
      return sendResponse(
        res,
        ERROR_CODE.UNAUTHORIZED,
        ERROR_MESSAGE.UNAUTHORIZED
      );

    console.log(JSON.stringify(req.body.foods));

    const { id: customer_id } = req.user;

    const jsonFood = JSON.stringify(foods);

    await con.query(
      `INSERT INTO orders (customer_id, foods, location_url) VALUES (?, ?, ?)`,
      [customer_id, JSON.stringify(req.body.foods), location_url]
    );

    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.CREATED);
  } catch (error) {
    if (error instanceof ZodError) {
      return sendResponse(
        res,
        ERROR_CODE.INVALID_INPUT,
        error.errors[0].message
      );
    }

    console.log(error);
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.SERVER_ERROR
    );
  } finally {
    await con.end();
  }
};
