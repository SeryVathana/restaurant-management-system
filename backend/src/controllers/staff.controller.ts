import { Request, Response } from "express";
import { ERROR_CODE, ERROR_MESSAGE, SUCCESS_CODE, SUCCESS_MESSAGE } from "../enums/enum";
import { sendResponse } from "../utils/forward";
import { createStaffSchema, updateStaffSchema } from "../validations/staff.validate";
import { ZodError } from "zod";
import { StaffModel } from "../models/staff.model";
import { isObjectIdOrHexString, mongo } from "mongoose";
import { IStaff } from "../interfaces/interface";

export const getAllStaffs = async (req: Request, res: Response) => {
  const { work_shift, job_title } = req.query;
  try {
    let staffs: IStaff[] = [];

    if (work_shift && job_title) {
      staffs = await StaffModel.find({ work_shift: work_shift, job_title });
    } else if (work_shift) {
      staffs = await StaffModel.find({ work_shift: work_shift });
    } else if (job_title) {
      staffs = await StaffModel.find({ job_title });
    } else {
      staffs = await StaffModel.find({});
    }
    return sendResponse(res, SUCCESS_CODE.OK, "", staffs);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const getStaffById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const isObjId = isObjectIdOrHexString(id);
    if (!isObjId) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.FOOD_NOT_FOUND);

    const staff = await StaffModel.findById(id);
    if (!staff) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.STAFF_NOT_FOUND);

    return sendResponse(res, SUCCESS_CODE.OK, "", staff);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const searchStaffs = async (req: Request, res: Response) => {
  const { query } = req.query;

  try {
    const staffs = await StaffModel.find({
      $or: [
        { email: { $regex: query, $options: "i" } },
        { first_name: { $regex: query, $options: "i" } },
        { last_name: { $regex: query, $options: "i" } },
      ],
    });

    return sendResponse(res, SUCCESS_CODE.OK, "", staffs);
  } catch (error) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const createStaff = async (req: Request, res: Response) => {
  try {
    const validatedInput = createStaffSchema.parse(req.body);

    const { job_title, hire_date } = validatedInput;

    if (hire_date && String(new Date(hire_date)) == "Invalid Date") return sendResponse(res, ERROR_CODE.INVALID_INPUT, ERROR_MESSAGE.INVALID_INPUT);

    await StaffModel.create({ ...validatedInput, job_title: job_title.trim().toLowerCase() });

    return sendResponse(res, SUCCESS_CODE.CREATED, SUCCESS_MESSAGE.CREATED);
  } catch (error: any) {
    if (error instanceof ZodError) {
      console.log(error);
      return sendResponse(res, ERROR_CODE.INVALID_INPUT, ERROR_MESSAGE.INVALID_INPUT);
    }

    if (error instanceof mongo.MongoError && error.code == 11000) {
      return sendResponse(res, 400, String(error.message).includes("email") ? ERROR_MESSAGE.EMAIL_EXISTED : ERROR_MESSAGE.PHONE_EXISTED);
    }

    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const updateStaffById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const isObjId = isObjectIdOrHexString(id);
    if (!isObjId) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.FOOD_NOT_FOUND);

    const validatedInput = updateStaffSchema.parse(req.body);
    const { first_name, last_name, email, phone_number, job_title, salary, work_shift } = validatedInput;

    const staff = await StaffModel.findById(id);
    if (!staff) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.STAFF_NOT_FOUND);

    staff.first_name = first_name || staff.first_name;
    staff.last_name = last_name || staff.last_name;
    staff.email = email || staff.email;
    staff.phone_number = phone_number || staff.phone_number;
    staff.job_title = job_title?.trim().toLowerCase() || staff.job_title;
    staff.salary = salary || staff.salary;
    staff.work_shift = work_shift || staff.work_shift;

    await staff.save();

    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.UPDATED);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return sendResponse(res, ERROR_CODE.INVALID_INPUT, ERROR_MESSAGE.INVALID_INPUT);
    }

    if (error instanceof mongo.MongoError && error.code == 11000) {
      return sendResponse(res, 400, String(error.message).includes("email") ? ERROR_MESSAGE.EMAIL_EXISTED : ERROR_MESSAGE.PHONE_EXISTED);
    }

    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};

export const deleteStaffById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const isObjId = isObjectIdOrHexString(id);
    if (!isObjId) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.FOOD_NOT_FOUND);

    const staff = await StaffModel.findById(id);
    if (!staff) return sendResponse(res, ERROR_CODE.NOT_FOUND, ERROR_MESSAGE.STAFF_NOT_FOUND);

    await staff.deleteOne();

    return sendResponse(res, SUCCESS_CODE.OK, SUCCESS_MESSAGE.DELETED);
  } catch (error: any) {
    console.log(error);
    return sendResponse(res, ERROR_CODE.SERVER_ERROR, ERROR_MESSAGE.SERVER_ERROR);
  }
};
