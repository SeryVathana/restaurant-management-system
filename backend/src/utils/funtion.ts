import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export const hashString = (data: string) => {
  try {
    const hash = crypto.createHash("sha256");
    const salt = process.env.PASSWORD_HASH_SALT || "iamsalty";

    hash.update(salt + data, "utf8");

    return hash.digest("hex");
  } catch (error) {
    console.log(error);
    throw new Error("error while hasing password");
  }
};
