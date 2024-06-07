import express from "express";
import { deleteCustomerById, getAllCustomers, getCustomerById, updateCustomerInfo, updateUserPassword } from "../controllers/customer.controller";

const customerRouter = express.Router();

customerRouter.get("/getAllCustomers", getAllCustomers);
customerRouter.get("/getCustomerById/:id", getCustomerById);
customerRouter.put("/updateCustomerInfo/:id", updateCustomerInfo);
customerRouter.put("/updateCustomerPassword/:id", updateUserPassword);
customerRouter.delete("/deleteCustomerById/:id", deleteCustomerById);

export default customerRouter;
