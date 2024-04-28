import { Response } from "express";
import { ERROR_CODE, ERROR_MESSAGE } from "../enums/enum";

export const sendResponse = (res: Response, code: ERROR_CODE | number, message: ERROR_MESSAGE | string = "", data: any = null) => {
  const jsonObj = {
    code,
    message,
    data,
  };

  if (!data) {
    delete jsonObj.data;
  }
  res.status(code).json(jsonObj);
};
