import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser } from "../interfaces/interface";

dotenv.config();

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "vathbekbek";

export const createUserToken = async (user: IUser) => {
  try {
    const token: string = jwt.sign(user, JWT_PRIVATE_KEY, {
      expiresIn: "7d",
    });

    return token;
  } catch (error) {
    console.log(error);
    throw new Error("error while create user token");
  }
};
