import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { string } from "zod";

export interface ILoggedInRequest extends Request {
  user?: IUser;
}

export interface IUser {
  _id: ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
}

export interface IAdmin {
  _id: ObjectId;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IFood {
  _id: ObjectId;
  title: string;
  description: string;
  price: string;
  categories: string[];
  img_url: string;
}

export interface IStaff {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  job_title: string;
  salary: number;
  work_shift: string;
  hire_date: string;
  createdAt: string;
  updatedAt: string;
}
