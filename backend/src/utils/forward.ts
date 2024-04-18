import { Response } from "express";
import { ERROR_CODE, ERROR_MESSAGE } from "../enums/enum";

export const sendResponse = (
  res: Response,
  code: ERROR_CODE | number,
  message: ERROR_MESSAGE | string = "",
  data: any = ""
) => {
  res.status(code).json({ code, message, data });
};
