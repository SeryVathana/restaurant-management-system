import { Request, Response } from "express";
import {
  ERROR_CODE,
  ERROR_MESSAGE,
  SUCCESS_CODE,
  SUCCESS_MESSAGE,
} from "../enums/enum";
import { sendResponse } from "../utils/forward";
import { connect } from "../configs/db";
import {
  createStaffSchema,
  updateStaffSchema,
} from "../validations/staff.validate";
import { ZodError } from "zod";

export const getAllStaffs = async (req: Request, res: Response) => {
  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );
  try {
    const [staffs]: any = await con.query(`SELECT * FROM staffs`);

    return sendResponse(res, SUCCESS_CODE.OK, "", staffs[0]);
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

export const getStaffById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );

  try {
    const [staff]: any = await con.query(
      `SELECT * FROM staffs WHERE staff_id=?`,
      [id]
    );

    if (staff.length <= 0) {
      return sendResponse(
        res,
        ERROR_CODE.NOT_FOUND,
        ERROR_MESSAGE.STAFF_NOT_FOUND
      );
    }

    return sendResponse(res, SUCCESS_CODE.OK, "", staff[0]);
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

export const getStaffsByJob = async (req: Request, res: Response) => {
  const { job } = req.params;

  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );

  try {
    const [staffs]: any = await con.query(`SELECT * FROM staffs WHERE job=?`, [
      job,
    ]);

    return sendResponse(res, SUCCESS_CODE.OK, "", staffs);
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

export const createStaff = async (req: Request, res: Response) => {
  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );

  try {
    const validatedInput = createStaffSchema.parse(req.body);
    const {
      first_name,
      last_name,
      email,
      phone_number,
      job,
      salary,
      work_shift,
    } = validatedInput;

    await con.query(
      `INSERT INTO staffs (first_name, last_name, email, phone_number, job, salary, work_shift_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, phone_number, job, salary, work_shift]
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

export const updateStaffById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );

  try {
    const validatedInput = updateStaffSchema.parse(req.body);
    const {
      first_name,
      last_name,
      email,
      phone_number,
      job,
      salary,
      work_shift,
    } = validatedInput;

    const [staff]: any = await con.query(
      `SELECT * FROM staffs WHERE staff_id=?`,
      [id]
    );

    if (staff.length <= 0) {
      return sendResponse(
        res,
        ERROR_CODE.NOT_FOUND,
        ERROR_MESSAGE.STAFF_NOT_FOUND
      );
    }

    await con.query(
      `UPDATE staffs SET
      first_name=?
      last_name=?
      email=?
      phone_number=?
      job=?
      salary=?
      work_shift=?
      WHERE staff_id=?;`,
      [
        first_name || staff[0].first_name,
        last_name || staff[0].last_name,
        email || staff[0].email,
        phone_number || staff[0].phone_number,
        job || staff[0].job,
        salary || staff[0].salary,
        work_shift || staff[0].work_shift,
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

export const deleteStaffById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const con = await connect();
  if (!con)
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.DB_CONNECTION
    );
  try {
    const [staff]: any = await con.query(
      `SELECT * FROM staffs WHERE staff_id=?`,
      [id]
    );

    if (staff.length <= 0) {
      return sendResponse(
        res,
        ERROR_CODE.NOT_FOUND,
        ERROR_MESSAGE.STAFF_NOT_FOUND
      );
    }

    await con.query(`DELETE FROM staffs WHERE staff_id=?`, [id]);

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
