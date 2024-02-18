import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

async function connectDB() {
  console.log('connecting to database...');

  let client: PoolClient | undefined;
  try {
    client = await pool.connect();
  } catch (err) {
    console.log('Error setup postgres:', err);
  } finally {
    if (client) client.release();
  }
}

export { pool, connectDB };
