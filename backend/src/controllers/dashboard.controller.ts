import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { ERROR_CODE, ERROR_MESSAGE, SUCCESS_CODE } from "../enums/enum";
import { sendResponse } from "../utils/forward";
import { OrderModel } from "../models/order.model";
import { FoodModel } from "../models/food.model";
import { StaffModel } from "../models/staff.model";

export const getTotalCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await UserModel.find();

    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

    const newCustomers = await UserModel.find({ createdAt: { $gte: lastMonth } });

    const data = {
      total: customers.length,
      new: newCustomers.length,
    };

    return sendResponse(res, SUCCESS_CODE.OK, "", data);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const getTotalOrders = async (req: Request, res: Response) => {
  try {
    const order = await OrderModel.find();

    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

    const newOrder = await OrderModel.find({ createdAt: { $gte: lastMonth } });

    const data = {
      total: order.length,
      new: newOrder.length,
    };

    return sendResponse(res, SUCCESS_CODE.OK, "", data);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const getTotalFood = async (req: Request, res: Response) => {
  try {
    const food = await FoodModel.find();

    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

    const newFood = await FoodModel.find({ createdAt: { $gte: lastMonth } });

    const data = {
      total: food.length,
      new: newFood.length,
    };

    return sendResponse(res, SUCCESS_CODE.OK, "", data);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const getTotalStaffs = async (req: Request, res: Response) => {
  try {
    const staff = await StaffModel.find();

    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

    const newStaffs = await StaffModel.find({ createdAt: { $gte: lastMonth } });

    const data = {
      total: staff.length,
      new: newStaffs.length,
    };

    return sendResponse(res, SUCCESS_CODE.OK, "", data);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const getTenNewestUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 }).limit(10).select("-password");

    return sendResponse(res, SUCCESS_CODE.OK, "", users);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const getTotalOrdersForLast6Months = async (req: Request, res: Response) => {
  try {
    const currentDate = new Date();
    const last6Months = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());

    const data: any = [];

    for (let i = 0; i < 6; i++) {
      const start = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const end = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);

      const orders = await OrderModel.find({ createdAt: { $gte: start, $lte: end } });

      data.push({
        month: start.toLocaleString("default", { month: "long" }).toLowerCase(),
        total_orders: orders.length,
      });
    }

    data.reverse();

    return sendResponse(res, SUCCESS_CODE.OK, "", data);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};
