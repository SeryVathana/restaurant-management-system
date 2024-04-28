import * as dotenv from "dotenv";

dotenv.config();
const config = {
  db: {
    host: "127.0.0.1",
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "res_man_db",
    connectTimeout: 60000,
  },
};

module.exports = config;
