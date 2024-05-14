import { Request, Response } from "express";
import { sendResponse } from "../utils/forward";
import { ERROR_CODE, ERROR_MESSAGE, SUCCESS_CODE, SUCCESS_MESSAGE } from "../enums/enum";
import { ILoggedInRequest } from "../interfaces/interface";
import { createOrderSchema } from "../validations/order.validate";
import { ZodError } from "zod";
import { OrderModel } from "../models/order.model";
import { isObjectIdOrHexString } from "mongoose";
import { FoodModel } from "../models/food.model";
import { AdminModel } from "../models/admin.model";
import { UserModel } from "../models/user.model";
import { create } from "domain";

export const getAllOrders = async (req: ILoggedInRequest, res: Response) => {
  try {
    const orders = await OrderModel.find({});

    const data: any = [];
    for (let i = 0; i < orders.length; i++) {
      let obj: any = {
        _id: orders[i]._id,
        user_fullname: "",
        user_email: "",
        order_status: orders[i].order_status,
        total_foods: 0,
        total_price: 0,
        created_at: orders[i].createdAt,
      };

      const user = await UserModel.findById(orders[i].user_id);
      if (user) {
        obj.user_fullname = `${user.first_name} ${user.last_name}`;
        obj.user_email = user.email;
      }

      obj.total_foods = orders[i].foods.reduce((acc: number, cur: any) => acc + cur.quantity, 0);

      for (let j = 0; j < orders[i].foods.length; j++) {
        const food = await FoodModel.findById(orders[i].foods[j].food_id);
        if (!food) continue;
        obj.total_price += food.price * orders[i].foods[j].quantity;
      }

      data.push(obj);
    }

    return sendResponse(res, SUCCESS_CODE.OK, "", data);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const getMyOrders = async (req: ILoggedInRequest, res: Response) => {
  const user = req.user;
  try {
    if (!user) return sendResponse(res, ERROR_CODE.UNAUTHORIZED, ERROR_MESSAGE.UNAUTHORIZED);

    const orders = await OrderModel.find({ user_id: user._id });

    const data: any = [];
    for (let i = 0; i < orders.length; i++) {
      let obj: any = {
        _id: orders[i]._id,
        order_status: orders[i].order_status,
        total_price: 0,
        created_at: orders[i].createdAt,
      };

      for (let j = 0; j < orders[i].foods.length; j++) {
        const food = await FoodModel.findById(orders[i].foods[j].food_id);
        if (!food) continue;
        obj.total_price += food.price * orders[i].foods[j].quantity;
      }

      data.push(obj);
    }

    return sendResponse(res, SUCCESS_CODE.OK, "", data);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const getOrderByCustomerId = async (req: ILoggedInRequest, res: Response) => {
  const curUser = req.user;
  const { id: user_id } = req.params;
  try {
    if (!curUser) return sendResponse(res, ERROR_CODE.UNAUTHORIZED, ERROR_MESSAGE.UNAUTHORIZED);

    const isObjId = isObjectIdOrHexString(user_id);
    if (!isObjId) return sendResponse(res, ERROR_CODE.INVALID_INPUT, ERROR_MESSAGE.INVALID_INPUT);

    const admin = await AdminModel.findById(curUser._id);
    if (!admin && String(curUser._id) != user_id) return sendResponse(res, ERROR_CODE.UNAUTHORIZED, ERROR_MESSAGE.UNAUTHORIZED);

    const user = await UserModel.findById(user_id);
    if (!user) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.CUSTOMER_NOT_FOUND);

    const orders = await OrderModel.find({ user_id: user_id });

    return sendResponse(res, SUCCESS_CODE.OK, "", orders);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const getOrderById = async (req: ILoggedInRequest, res: Response) => {
  const curUser = req.user;
  const { id } = req.params;
  try {
    if (!curUser) return sendResponse(res, ERROR_CODE.UNAUTHORIZED, ERROR_MESSAGE.UNAUTHORIZED);

    const isObjId = isObjectIdOrHexString(id);
    if (!isObjId) return sendResponse(res, ERROR_CODE.INVALID_INPUT, ERROR_MESSAGE.INVALID_INPUT);

    const admin = await AdminModel.findById(curUser._id);

    const order: any = await OrderModel.findById(id);
    if (!order) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.ORDER_NOT_FOUND);

    if (!admin && String(curUser._id) != order.user_id) return sendResponse(res, ERROR_CODE.UNAUTHORIZED, ERROR_MESSAGE.UNAUTHORIZED);

    const data: any = {
      _id: order._id,
      user_fullname: "",
      user_email: "",
      order_status: order.order_status,
      total_price: 0,
      total_foods: 0,
      created_at: order.createdAt,
      foods: [],
    };

    const user = await UserModel.findById(order.user_id);
    if (user) {
      data.user_fullname = `${user.first_name} ${user.last_name}`;
      data.user_email = user.email;
    }

    data.total_foods = order.foods.reduce((acc: number, cur: any) => acc + cur.quantity, 0);

    for (let j = 0; j < order.foods.length; j++) {
      const food = await FoodModel.findById(order.foods[j].food_id);
      if (!food) continue;
      data.foods.push({ _id: food._id, title: food.title, img_url: food.img_url, price: food.price, quantity: order.foods[j].quantity });
      data.total_price += food.price * order.foods[j].quantity;
    }

    return sendResponse(res, SUCCESS_CODE.OK, "", data);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

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

export const deleteOrderById = async (req: ILoggedInRequest, res: Response) => {
  const { id } = req.params;
  try {
    const isObjId = isObjectIdOrHexString(id);
    if (!isObjId) return sendResponse(res, ERROR_CODE.INVALID_INPUT, ERROR_MESSAGE.INVALID_INPUT);

    const order = await OrderModel.findByIdAndDelete(id);
    if (!order) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.ORDER_NOT_FOUND);

    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.DELETED);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const updateOrderStatus = async (req: ILoggedInRequest, res: Response) => {
  const { id } = req.params;
  const { order_status } = req.body;
  try {
    const isObjId = isObjectIdOrHexString(id);
    if (!isObjId) return sendResponse(res, ERROR_CODE.INVALID_INPUT, ERROR_MESSAGE.INVALID_INPUT);

    const order = await OrderModel.findByIdAndUpdate(id, { order_status }, { new: true });
    if (!order) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.ORDER_NOT_FOUND);

    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.UPDATED, order);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};
