import { createPool } from 'mysql2/promise';
import * as dotenv from "dotenv"

dotenv.config()

export async function connect() {
    try {
        var connection = await createPool({
            // prefer to use .env for environment variables to hide passwords
            host: '127.0.0.1',
            port: Number(process.env.MYSQL_PORT) || 3306,
            user: process.env.MYSQL_USERNAME || "root",
            password: process.env.MYSQL_PASSWORD || "vathloplop",
            database: 'res_man_db'
        });
    } catch (err) {
        console.log("error while connect to database: ", err);
        return;
    }

    return connection
}