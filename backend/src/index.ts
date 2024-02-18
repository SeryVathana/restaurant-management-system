import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';

import { connectDB } from './database';

import StaffRouter from './routes/staff.router';
import AuthRouter from './routes/auth.router';
import FoodRouter from './routes/food.router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: 10000 }));
app.use(cookieParser());

app.use('/staff', StaffRouter);
app.use('/auth', AuthRouter);
app.use('/food', FoodRouter);

async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

startServer();
