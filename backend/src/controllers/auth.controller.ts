import { Request, Response } from "express";
import { ZodError, string, z } from "zod";
import { sendResponse } from "../utils/forward";
import { customerRegisterScehma, customerLoginSchema, adminLoginSchema, adminRegisterScehma } from "../validations/auth.validate";
import { hashString } from "../utils/funtion";
import { ERROR_CODE, ERROR_MESSAGE, SUCCESS_CODE, SUCCESS_MESSAGE } from "../enums/enum";
import { IAdmin, IUser } from "../interfaces/interface";
import { createUserToken } from "../utils/token";
import { UserModel } from "../models/user.model";
import { mongo } from "mongoose";
import { AdminModel } from "../models/admin.model";

export const registerCustomer = async (req: Request, res: Response) => {
  try {
    const validatedCus = customerRegisterScehma.parse(req.body);

    const { password } = validatedCus;

    const hashedPassword = hashString(password);
    const customer = await UserModel.create({ ...validatedCus, password: hashedPassword });

    const userObj: IUser = {
      _id: customer.id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      phone_number: customer.phone_number,
    };

    const jwtToken = await createUserToken(userObj);

    const resData = {
      user: userObj,
      token: jwtToken,
    };
    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.REGISTERED, resData);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return sendResponse(res, ERROR_CODE.INVALID_INPUT, error.errors[0].message);
    }

    if (error instanceof mongo.MongoError && error.code == 11000) {
      return sendResponse(res, 400, String(error.message).includes("email") ? ERROR_MESSAGE.EMAIL_EXISTED : ERROR_MESSAGE.PHONE_EXISTED);
    }

    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const loginCustomer = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const validatedInput = customerLoginSchema.parse(req.body);
    const { email_phone, password } = validatedInput;

    const hashedPassword = hashString(password);
    const customer = await UserModel.findOne({ $or: [{ email: email_phone }, { phone_number: email_phone }] });
    if (!customer || customer.password != hashedPassword) {
      return sendResponse(res, ERROR_CODE.INVALID_INPUT, ERROR_MESSAGE.INCORRECT_CREDENTIAL);
    }

    const userObj: IUser = {
      _id: customer.id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      phone_number: customer.phone_number,
    };

    const jwtToken = await createUserToken(userObj);

    const resData = {
      user: userObj,
      token: jwtToken,
    };
    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.LOGGEDIN, resData);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return sendResponse(res, ERROR_CODE.INVALID_INPUT, error.errors[0].message);
    }

    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const validatedAdmin = adminRegisterScehma.parse(req.body);

    const { first_name, last_name, email, password } = validatedAdmin;

    const hashedPassword = hashString(password);
    const admin = await AdminModel.create({ first_name, last_name, email, password: hashedPassword });

    const adminObj: IAdmin = {
      _id: admin.id,
      first_name: admin.first_name,
      last_name: admin.last_name,
      email: admin.email,
    };

    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.REGISTERED, adminObj);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return sendResponse(res, ERROR_CODE.INVALID_INPUT, error.errors[0].message);
    }

    if (error instanceof mongo.MongoError && error.code == 11000) {
      return sendResponse(res, 400, ERROR_MESSAGE.EMAIL_EXISTED);
    }

    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const validatedInput = adminLoginSchema.parse(req.body);
    const { email, password } = validatedInput;

    const hashedPassword = hashString(password);
    const admin: any = await AdminModel.findOne({ email });
    if (!admin || admin.password != hashedPassword) {
      return sendResponse(res, ERROR_CODE.INVALID_INPUT, ERROR_MESSAGE.INCORRECT_CREDENTIAL);
    }

    const adminObj: IAdmin = {
      _id: admin.id,
      first_name: admin.first_name,
      last_name: admin.last_name,
      email: admin.email,
    };

    const jwtToken = await createUserToken(adminObj);

    const resData = {
      user: adminObj,
      token: jwtToken,
    };
    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.LOGGEDIN, resData);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return sendResponse(res, ERROR_CODE.INVALID_INPUT, error.errors[0].message);
    }

    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};
