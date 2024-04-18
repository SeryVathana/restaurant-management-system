import { Router } from "express";

import authRouter from "./auth.route";
import staffRouter from "./staff.route";
import orderRouter from "./order.route";
import foodRouter from "./food.route";
import jobRouter from "./job.route";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/food", foodRouter);
routes.use("/job", jobRouter);
routes.use("/staff", staffRouter);
routes.use("/order", orderRouter);

export default routes;
