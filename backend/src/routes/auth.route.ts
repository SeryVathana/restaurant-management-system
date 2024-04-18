import express from "express";
import {
  loginAdmin,
  loginCustomer,
  registerCustomer,
} from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/admin/login", loginAdmin);

authRouter.post("/customer/register", registerCustomer);
authRouter.post("/customer/login", loginCustomer);

// authRouter.post('/logout', logout);

export default authRouter;
