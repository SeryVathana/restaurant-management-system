import express from "express";
import {
  loginAdmin,
  // loginAdmin,
  loginCustomer,
  registerAdmin,
  registerCustomer,
} from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/admin/register", registerAdmin);
authRouter.post("/admin/login", loginAdmin);

authRouter.post("/customer/register", registerCustomer);
authRouter.post("/customer/login", loginCustomer);

// // authRouter.post('/logout', logout);

export default authRouter;
