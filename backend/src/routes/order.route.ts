import express from "express";
import { verifyUserToken } from "../middlewares/auth.middleware";
import { createOrder } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.use(verifyUserToken);

// // orderRouter.get("/getAllOrders", getAllOrders);
// // orderRouter.get("/getOrderById/:id", getOrderById);
// // orderRouter.get("/getOrderByCusId/:id", getOrderByCustomerId);

orderRouter.post("/createOrder", createOrder);

// // orderRouter.patch("/updateOrderById/:id", updateOrderById);

export default orderRouter;
