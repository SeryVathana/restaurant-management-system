import express from "express";
import { deleteCustomerById, getAllCustomers, getCustomerById } from "../controllers/customer.controller";

const customerRouter = express.Router();

customerRouter.get("/getAllCustomers", getAllCustomers);
customerRouter.get("/getCustomerById/:id", getCustomerById);
customerRouter.delete("/deleteCustomerById/:id", deleteCustomerById);

export default customerRouter;
