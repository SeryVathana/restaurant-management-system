import { Request, Response } from "express";
import { connect } from "../configs/db";
import { sendResponse } from "../utils/forward";
import {
  ERROR_CODE,
  ERROR_MESSAGE,
  SUCCESS_CODE,
  SUCCESS_MESSAGE,
} from "../enums/enum";
import { createJobSchema, updateJobSchema } from "../validations/job.validate";
import { ZodError } from "zod";

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    const [jobs] = await con.query(`SELECT * FROM job`);
    return sendResponse(res, SUCCESS_CODE.OK, "", jobs);
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.SERVER_ERROR
    );
  }
};

export const getJobById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    const [job]: any = await con.query(`SELECT * FROM job WHERE job_id=?`, [
      id,
    ]);

    if (job.length <= 0) {
      return sendResponse(
        res,
        ERROR_CODE.NOT_FOUND,
        ERROR_MESSAGE.JOB_NOT_FOUND
      );
    }
    return sendResponse(res, SUCCESS_CODE.OK, "", job[0]);
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      ERROR_CODE.SERVER_ERROR,
      ERROR_MESSAGE.SERVER_ERROR
    );
  }
};

export const createJob = async (req: Request, res: Response) => {
  try {
    const validatedInput = createJobSchema.parse(req.body);
    const { title, description } = validatedInput;

    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    await con.query(`INSERT INTO job (title, description) VALUES (?, ?)`, [
      title,
      description,
    ]);

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

export const updateJobById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const validatedInput = updateJobSchema.parse(req.body);
    const { title, description } = validatedInput;

    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    const [job]: any = await con.query(`SELECT * FROM job WHERE job_id=?`, [
      id,
    ]);

    if (job.length <= 0) {
      return sendResponse(
        res,
        ERROR_CODE.NOT_FOUND,
        ERROR_MESSAGE.JOB_NOT_FOUND
      );
    }

    await con.query(
      `UPDATE job SET
    title=?,
    description=?,
    WHERE job_id=?;`,
      [title || job[0].title, description || job[0].description, Number(id)]
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

export const deleteJobById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const con = await connect();
    if (!con)
      return sendResponse(
        res,
        ERROR_CODE.SERVER_ERROR,
        ERROR_MESSAGE.DB_CONNECTION
      );

    const [job]: any = await con.query(`SELECT * FROM job WHERE job_id=?`, [
      id,
    ]);

    if (job.length <= 0) {
      return sendResponse(
        res,
        ERROR_CODE.NOT_FOUND,
        ERROR_MESSAGE.FOOD_NOT_FOUND
      );
    }

    await con.query(`DELETE FROM job WHERE job_id=?`, [id]);

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
