import { Router } from "express";
import foodRouter from "./food.route";
import authRouter from "./auth.route";
import staffRouter from "./staff.route";
import orderRouter from "./order.route";
import customerRouter from "./customer.route";
import dashboardRouter from "./dashboard.route";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/food", foodRouter);
routes.use("/staff", staffRouter);
routes.use("/order", orderRouter);
routes.use("/customer", customerRouter);
routes.use("/dashboard", dashboardRouter);

export default routes;
