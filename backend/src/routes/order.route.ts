import express from "express";
import { checkAdminPermission, verifyUserToken } from "../middlewares/auth.middleware";
import {
  createOrder,
  deleteOrderById,
  getAllOrders,
  getMyOrders,
  getOrderByCustomerId,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.use(verifyUserToken);

orderRouter.get("/getAllOrders", checkAdminPermission, getAllOrders);
orderRouter.get("/getMyOrders", getMyOrders);
orderRouter.get("/getOrderByCusId/:id", getOrderByCustomerId);
orderRouter.get("/getOrderById/:id", getOrderById);
orderRouter.post("/createOrder", createOrder);
orderRouter.put("/updateOrderStatus/:id", checkAdminPermission, updateOrderStatus);
orderRouter.delete("/deleteOrderById/:id", checkAdminPermission, deleteOrderById);

export default orderRouter;
