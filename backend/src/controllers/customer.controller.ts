import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { sendResponse } from "../utils/forward";
import { ERROR_CODE, ERROR_MESSAGE, SUCCESS_CODE, SUCCESS_MESSAGE } from "../enums/enum";
import { isObjectIdOrHexString } from "mongoose";
import { hashString } from "../utils/funtion";

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const { search, sort } = req.query;

    let query = UserModel.find().select("-password");

    if (search) {
      query = query.find({
        $or: [
          { first_name: { $regex: search, $options: "i" } },
          { last_name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      });
    }

    if (sort === "oldest") {
      query = query.sort({ createdAt: 1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const customers = await query.exec();
    return sendResponse(res, SUCCESS_CODE.OK, "", customers);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const isObjId = isObjectIdOrHexString(id);
    if (!isObjId) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.CUSTOMER_NOT_FOUND);

    const customer = await UserModel.findById(id).select("-password");
    if (!customer) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.CUSTOMER_NOT_FOUND);

    return sendResponse(res, SUCCESS_CODE.OK, "", customer);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const updateCustomerInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone_number } = req.body;

    const isObjId = isObjectIdOrHexString(id);
    if (!isObjId) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.CUSTOMER_NOT_FOUND);

    const customer = await UserModel.findByIdAndUpdate(id, { first_name, last_name, phone_number }, { new: true }).select("-password");

    if (!customer) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.CUSTOMER_NOT_FOUND);

    return sendResponse(res, SUCCESS_CODE.OK, "", customer);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { old_password, new_password } = req.body;

    const isObjId = isObjectIdOrHexString(id);
    if (!isObjId) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.CUSTOMER_NOT_FOUND);

    const customer = await UserModel.findById(id);
    if (!customer) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.CUSTOMER_NOT_FOUND);
    console.log(customer.password, old_password, hashString(old_password));
    const hashedPassword = hashString(old_password);
    const isMatch = hashedPassword == customer.password;
    console.log(isMatch);
    if (!isMatch) return sendResponse(res, ERROR_CODE.INVALID_INPUT, ERROR_MESSAGE.INVALID_INPUT);

    customer.password = hashString(new_password);
    await customer.save();

    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.UPDATED);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const deleteCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const isObjId = isObjectIdOrHexString(id);
    if (!isObjId) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.CUSTOMER_NOT_FOUND);

    const customer = await UserModel.findByIdAndDelete(id);
    if (!customer) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.CUSTOMER_NOT_FOUND);

    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.DELETED);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};
