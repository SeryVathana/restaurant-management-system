import express from "express";
import { createOrder, getAllOrders, getOrderByCustomerId, getOrderById, updateOrderById } from "../controllers/order.controller";
import { checkLogin } from "../middlewares/auth.middleware";

const route = express.Router();

route.get("/getAllOrders", getAllOrders);
route.get("/getOrderById", getOrderById);
route.get("/getOrderByCusId", getOrderByCustomerId);

route.post("/createNewOrder", createOrder);

route.put("/updateOrderById", updateOrderById);

export default route;
