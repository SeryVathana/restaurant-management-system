import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IAdmin, ILoggedInRequest, IUser } from "../interfaces/interface";
import { sendResponse } from "../utils/forward";
import { ERROR_CODE, ERROR_MESSAGE } from "../enums/enum";
import { AdminModel } from "../models/admin.model";

export const verifyUserToken = async (req: ILoggedInRequest, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) return sendResponse(res, ERROR_CODE.UNAUTHORIZED, ERROR_MESSAGE.MISSING_AUTH_HEADER);

    const [type, token] = authorization.split(" ");
    if (type.toLowerCase() != "bearer") return sendResponse(res, ERROR_CODE.UNAUTHORIZED, ERROR_MESSAGE.INVALID_TOKEN_TYPE);

    const data: any = jwt.verify(token, process.env.JWT_SECRET_KEY || "vathbekbek");
    if (!data) return sendResponse(res, ERROR_CODE.UNAUTHORIZED, ERROR_MESSAGE.UNAUTHORIZED);

    const userData: IUser = {
      _id: data._id,
      email: data.email,
      phone_number: data.phone_number,
      first_name: data.first_name,
      last_name: data.last_name,
    };

    req.user = userData;

    next();
  } catch (error: any) {
    return sendResponse(res, ERROR_CODE.UNAUTHORIZED, "User token expired");
  }
};

export const verifyAdminToken = async (req: ILoggedInRequest, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) return sendResponse(res, ERROR_CODE.UNAUTHORIZED, ERROR_MESSAGE.MISSING_AUTH_HEADER);

    const [type, token] = authorization.split(" ");
    if (type.toLowerCase() != "bearer") return sendResponse(res, ERROR_CODE.UNAUTHORIZED, ERROR_MESSAGE.INVALID_TOKEN_TYPE);

    const data: any = jwt.verify(token, process.env.JWT_SECRET_KEY || "vathbekbek");
    if (!data) return sendResponse(res, ERROR_CODE.UNAUTHORIZED, ERROR_MESSAGE.UNAUTHORIZED);

    const adminData: IAdmin = {
      _id: data._id,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
    };

    req.user = adminData;

    next();
  } catch (error: any) {
    return sendResponse(res, ERROR_CODE.UNAUTHORIZED, "User token expired");
  }
};

export const checkAdminPermission = async (req: ILoggedInRequest, res: Response, next: NextFunction) => {
  const user = req.user as IAdmin;

  console.log(user);

  if (!user) return sendResponse(res, ERROR_CODE.UNAUTHORIZED, ERROR_MESSAGE.UNAUTHORIZED);

  try {
    const admin = await AdminModel.findById(user._id);
    if (!admin) return sendResponse(res, ERROR_CODE.UNAUTHORIZED, ERROR_MESSAGE.UNAUTHORIZED);
    console.log(user);
    next();
  } catch (error: any) {
    return sendResponse(res, ERROR_CODE.UNAUTHORIZED, ERROR_MESSAGE.UNAUTHORIZED);
  }
};
