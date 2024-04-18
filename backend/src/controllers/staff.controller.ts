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
  try {
    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    const [staffs]: any = await con.query(`SELECT * FROM staff`);

    return sendResponse(res, SUCCESS_CODE.OK, "", staffs[0]);
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.SERVER_ERROR
    );
  }
};

export const getStaffById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    const [staff]: any = await con.query(
      `SELECT * FROM staff WHERE staff_id=?`,
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
  }
};

export const getStaffsByJob = async (req: Request, res: Response) => {
  const { job_title } = req.params;

  try {
    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    const [job]: any = await con.query(`SELECT * FROM job WHERE title=?`, [
      job_title,
    ]);

    if (job.length <= 0) {
      return sendResponse(
        res,
        ERROR_CODE.NOT_FOUND,
        ERROR_MESSAGE.JOB_NOT_FOUND
      );
    }

    const job_id = job[0].job_id;

    const [staffs]: any = await con.query(
      `SELECT * FROM staff WHERE job_id=?`,
      [job_id]
    );

    return sendResponse(res, SUCCESS_CODE.OK, "", staffs);
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.SERVER_ERROR
    );
  }
};

export const createStaff = async (req: Request, res: Response) => {
  try {
    const validatedInput = createStaffSchema.parse(req.body);
    const {
      first_name,
      last_name,
      email,
      phone_number,
      job_id,
      salary,
      work_shift_id,
    } = validatedInput;

    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    await con.query(
      `INSERT INTO staff (first_name, last_name, email, phone_number, job_id, salary, work_shift_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name,
        last_name,
        email,
        phone_number,
        job_id,
        salary,
        work_shift_id,
      ]
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
  }
};

export const updateStaffById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const validatedInput = updateStaffSchema.parse(req.body);
    const {
      first_name,
      last_name,
      email,
      phone_number,
      job_id,
      salary,
      work_shift_id,
    } = validatedInput;

    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    const [staff]: any = await con.query(
      `SELECT * FROM staff WHERE staff_id=?`,
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
      `UPDATE staff SET
      first_name=?
      last_name=?
      email=?
      phone_number=?
      job_id=?
      salary=?
      work_shift_id=?
      WHERE staff_id=?;`,
      [
        first_name || staff[0].first_name,
        last_name || staff[0].last_name,
        email || staff[0].email,
        phone_number || staff[0].phone_number,
        job_id || staff[0].job_id,
        salary || staff[0].salary,
        work_shift_id || staff[0].work_shift_id,
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
  }
};

export const deleteStaffById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    const [staff]: any = await con.query(
      `SELECT * FROM staff WHERE staff_id=?`,
      [id]
    );

    if (staff.length <= 0) {
      return sendResponse(
        res,
        ERROR_CODE.NOT_FOUND,
        ERROR_MESSAGE.STAFF_NOT_FOUND
      );
    }

    await con.query(`DELETE FROM staff WHERE staff_id=?`, [id]);

    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.DELETED);
  } catch (error: any) {
    console.log(error);
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.SERVER_ERROR
    );
  }
};
