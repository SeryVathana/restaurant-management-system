import { Request, Response } from "express";
import { ZodError, string, z } from "zod";
import { connect } from "../configs/db";
import { sendResponse } from "../utils/forward";
import {
  customerRegisterScehma,
  customerLoginSchema,
  adminLoginSchema,
  adminRegisterScehma,
} from "../validations/auth.validate";
import { hashString } from "../utils/funtion";
import {
  ERROR_CODE,
  ERROR_MESSAGE,
  SUCCESS_CODE,
  SUCCESS_MESSAGE,
} from "../enums/enum";
import { IUser } from "../interfaces/interface";
import { createUserToken } from "../utils/token";

export const registerCustomer = async (req: Request, res: Response) => {
  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );

  try {
    const validatedCus = customerRegisterScehma.parse(req.body);

    const { first_name, last_name, email, phone_number, password } =
      validatedCus;

    const hashedPassword = hashString(password);

    await con.query(
      `INSERT INTO customers (first_name, last_name, email, password, phone_number)
    VALUES (?, ?, ?, ?, ?)`,
      [first_name, last_name, email, hashedPassword, phone_number]
    );

    const [customer]: any = await con.query(
      `SELECT * FROM customers WHERE email=?`,
      [email]
    );

    console.log(customer);

    const userObj: IUser = {
      id: customer[0].customer_id,
      first_name: customer[0].first_name,
      last_name: customer[0].last_name,
      email: customer[0].email,
      phone_number: customer[0].phone_number,
    };

    const jwtToken = await createUserToken(userObj);

    const resData = {
      ...customer[0],
      token: jwtToken,
    };
    return sendResponse(
      res,
      SUCCESS_CODE.OK,
      SUCCESS_MESSAGE.REGISTERED,
      resData
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return sendResponse(
        res,
        ERROR_CODE.INVALID_INPUT,
        error.errors[0].message
      );
    }

    if (error.code == "ER_DUP_ENTRY") {
      return sendResponse(
        res,
        400,
        String(error.sqlMessage).includes("email")
          ? ERROR_MESSAGE.EMAIL_EXISTED
          : ERROR_MESSAGE.PHONE_EXISTED
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

export const loginCustomer = async (req: Request, res: Response) => {
  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );

  try {
    const validatedInput = customerLoginSchema.parse(req.body);
    const { email_phone, password } = validatedInput;

    const hashedPassword = hashString(password);
    const [customer]: any = await con.query(
      "SELECT customer_id, first_name, last_name, email, phone_number, created_at FROM customers WHERE (email=? OR phone_number=?) AND password=?",
      [email_phone, email_phone, hashedPassword]
    );

    if (customer.length <= 0) {
      return sendResponse(
        res,
        ERROR_CODE.INVALID_INPUT,
        ERROR_MESSAGE.INCORRECT_CREDENTIAL
      );
    }

    const userObj: IUser = {
      id: customer[0].customer_id,
      first_name: customer[0].first_name,
      last_name: customer[0].last_name,
      email: customer[0].email,
      phone_number: customer[0].phone_number,
    };

    const jwtToken = await createUserToken(userObj);

    const resData = {
      ...customer[0],
      token: jwtToken,
    };
    return sendResponse(
      res,
      SUCCESS_CODE.OK,
      SUCCESS_MESSAGE.LOGGEDIN,
      resData
    );
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

export const registerAdmin = async (req: Request, res: Response) => {
  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );

  try {
    const validatedCus = adminRegisterScehma.parse(req.body);

    const { first_name, last_name, email, password } = validatedCus;

    const hashedPassword = hashString(password);

    await con.query(
      `INSERT INTO customers (first_name, last_name, email, password)
    VALUES (?, ?, ?, ?)`,
      [first_name, last_name, email, hashedPassword]
    );

    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.REGISTERED);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return sendResponse(
        res,
        ERROR_CODE.INVALID_INPUT,
        error.errors[0].message
      );
    }

    if (error.code == "ER_DUP_ENTRY") {
      return sendResponse(
        res,
        400,
        String(error.sqlMessage).includes("email")
          ? ERROR_MESSAGE.EMAIL_EXISTED
          : ERROR_MESSAGE.PHONE_EXISTED
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

export const loginAdmin = async (req: Request, res: Response) => {
  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );

  try {
    const validatedInput = adminLoginSchema.parse(req.body);
    const { email, password } = validatedInput;

    const hashedPassword = hashString(password);
    const [admin]: any = await con.query(
      "SELECT admin_id, email, first_name, last_name, created_at FROM admins WHERE email=? AND password=?",
      [email, hashedPassword]
    );

    if (admin.length <= 0) {
      return sendResponse(
        res,
        ERROR_CODE.INVALID_INPUT,
        ERROR_MESSAGE.INCORRECT_CREDENTIAL
      );
    }

    const userObj: IUser = {
      id: admin[0].admin_id,
      first_name: admin[0].first_name,
      last_name: admin[0].last_name,
      email: admin[0].email,
    };

    const jwtToken = await createUserToken(userObj);

    const resData = {
      ...admin[0],
      token: jwtToken,
    };
    return sendResponse(
      res,
      SUCCESS_CODE.OK,
      SUCCESS_MESSAGE.LOGGEDIN,
      resData
    );
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
