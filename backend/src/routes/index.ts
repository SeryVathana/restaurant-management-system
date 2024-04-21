import { Router } from "express";

import authRouter from "./auth.route";
import staffRouter from "./staff.route";
import orderRouter from "./order.route";
import foodRouter from "./food.route";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/food", foodRouter);
routes.use("/staff", staffRouter);
routes.use("/order", orderRouter);

export default routes;
