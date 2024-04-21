import { createPool } from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config();

export async function connect() {
  try {
    var connection = createPool({
      // prefer to use .env for environment variables to hide passwords
      host: "127.0.0.1",
      port: Number(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: "res_man_db",
    });
  } catch (err) {
    console.log("error while connect to database: ", err);
    return;
  }

  return connection;
}
