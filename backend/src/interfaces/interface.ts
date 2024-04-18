import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface ILoggedInRequest extends Request {
  user?: IUser;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
}
