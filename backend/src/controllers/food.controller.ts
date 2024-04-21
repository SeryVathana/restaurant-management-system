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
  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );

  try {
    const [foods]: any = await con.query(`SELECT * FROM foods`);

    const breakfast = foods.filter((food: any) => food.category == "breakfast");
    const lunch = foods.filter((food: any) => food.category == "lunch");
    const dinner = foods.filter((food: any) => food.category == "dinner");

    const result = { breakfast, lunch, dinner };

    return sendResponse(res, SUCCESS_CODE.OK, "", result);
  } catch (error) {
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

export const getFoodById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );

  try {
    const [food]: any = await con.query(`SELECT * FROM foods WHERE food_id=?`, [
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
  } finally {
    await con.end();
  }
};

export const getFoodsByTitle = async (req: Request, res: Response) => {
  const { term } = req.params;

  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );

  try {
    const escapedTerm = `%${term.toLowerCase()}%`;
    const [foods]: any = await con.query(
      `SELECT * FROM foods WHERE LOWER(title) LIKE ?`,
      [escapedTerm]
    );

    return sendResponse(res, SUCCESS_CODE.OK, "", foods);
  } catch (error) {
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

export const getFoodsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;

  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );

  try {
    const [food]: any = await con.query(
      `SELECT * FROM foods WHERE category=?`,
      [category]
    );

    return sendResponse(res, SUCCESS_CODE.OK, "", food);
  } catch (error) {
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

export const createFood = async (req: Request, res: Response) => {
  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );

  try {
    const validatedInput = createFoodSchema.parse(req.body);
    const { title, description, category } = validatedInput;

    await con.query(
      `INSERT INTO foods (title, description, category) VALUES (?, ?, ?)`,
      [title, description, category]
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
  } finally {
    await con.end();
  }
};

export const updateFoodById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );

  try {
    const validatedInput = updateFoodSchema.parse(req.body);
    const { title, description, category } = validatedInput;

    const [food]: any = await con.query(`SELECT * FROM foods WHERE food_id=?`, [
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
      `UPDATE foods SET
    title=?,
    description=?,
    category=?
    WHERE food_id=?;`,
      [
        title || food[0].title,
        description || food[0].description,
        category || food[0].category,
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
  } finally {
    await con.end();
  }
};

export const deleteFoodById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );
  try {
    const [food]: any = await con.query(`SELECT * FROM foods WHERE food_id=?`, [
      id,
    ]);

    if (food.length <= 0) {
      return sendResponse(
        res,
        ERROR_CODE.NOT_FOUND,
        ERROR_MESSAGE.FOOD_NOT_FOUND
      );
    }

    await con.query(`DELETE FROM foods WHERE food_id=?`, [id]);

    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.DELETED);
  } catch (error: any) {
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
