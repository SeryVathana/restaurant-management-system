import { Request, Response } from "express";
import { connect } from "../configs/db";
import { sendResponse } from "../utils/forward";
import {
  ERROR_CODE,
  ERROR_MESSAGE,
  SUCCESS_CODE,
  SUCCESS_MESSAGE,
} from "../enums/enum";
import {
  createFoodSchema,
  updateFoodSchema,
} from "../validations/food.validate";
import { ZodError } from "zod";

export const getAllFoods = async (req: Request, res: Response) => {
  try {
    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    const [foods] = await con.query(`SELECT * FROM food`);

    return sendResponse(res, SUCCESS_CODE.OK, "", foods);
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.SERVER_ERROR
    );
  }
};

export const getFoodById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    const [food]: any = await con.query(`SELECT * FROM food WHERE food_id=?`, [
      id,
    ]);

    if (food.length <= 0) {
      return sendResponse(
        res,
        ERROR_CODE.NOT_FOUND,
        ERROR_MESSAGE.FOOD_NOT_FOUND
      );
    }

    return sendResponse(res, SUCCESS_CODE.OK, "", food[0]);
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.SERVER_ERROR
    );
  }
};

export const getFoodsByCategory = async (req: Request, res: Response) => {
  const { category_title } = req.params;

  try {
    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    const [category]: any = await con.query(
      `SELECT * FROM food_category WHERE title=?`,
      [category_title]
    );

    if (category.length <= 0) {
      return sendResponse(
        res,
        ERROR_CODE.NOT_FOUND,
        ERROR_MESSAGE.CATEGORY_NOT_FOUND
      );
    }

    const cat_id = category[0].category_id;

    const [food]: any = await con.query(
      `SELECT * FROM food WHERE category_id=?`,
      [cat_id]
    );

    return sendResponse(res, SUCCESS_CODE.OK, "", food);
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.SERVER_ERROR
    );
  }
};

export const createFood = async (req: Request, res: Response) => {
  try {
    const validatedInput = createFoodSchema.parse(req.body);
    const { title, description, category_id } = validatedInput;

    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    await con.query(
      `INSERT INTO food (title, description, category_id) VALUES (?, ?, ?)`,
      [title, description, category_id]
    );

    return sendResponse(res, SUCCESS_CODE.CREATED, SUCCESS_MESSAGE.CREATED);
  } catch (error: any) {
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
  }
};

export const updateFoodById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const validatedInput = updateFoodSchema.parse(req.body);
    const { title, description, category_id } = validatedInput;

    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    const [food]: any = await con.query(`SELECT * FROM food WHERE food_id=?`, [
      id,
    ]);

    if (food.length <= 0) {
      return sendResponse(
        res,
        ERROR_CODE.NOT_FOUND,
        ERROR_MESSAGE.FOOD_NOT_FOUND
      );
    }

    await con.query(
      `UPDATE food SET
    title=?,
    description=?,
    category_id=?
    WHERE food_id=?;`,
      [
        title || food[0].title,
        description || food[0].description,
        category_id || food[0].category_id,
        Number(id),
      ]
    );

    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.UPDATED);
  } catch (error: any) {
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
  }
};

export const deleteFoodById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    const [food]: any = await con.query(`SELECT * FROM food WHERE food_id=?`, [
      id,
    ]);

    if (food.length <= 0) {
      return sendResponse(
        res,
        ERROR_CODE.NOT_FOUND,
        ERROR_MESSAGE.FOOD_NOT_FOUND
      );
    }

    await con.query(`DELETE FROM food WHERE food_id=?`, [id]);

    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.DELETED);
  } catch (error: any) {
    console.log(error);
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.SERVER_ERROR
    );
  }
};
