import express, { Request, Response } from "express";
import {
  loginAdmin,
  // loginAdmin,
  loginCustomer,
  registerAdmin,
  registerCustomer,
} from "../controllers/auth.controller";
import { verifyUserToken } from "../middlewares/auth.middleware";
import { sendResponse } from "../utils/forward";

const authRouter = express.Router();

authRouter.post("/admin/register", registerAdmin);
authRouter.post("/admin/login", loginAdmin);

authRouter.post("/customer/register", registerCustomer);
authRouter.post("/customer/login", loginCustomer);

authRouter.get("/checkSession", verifyUserToken, (req: Request, res: Response) => {
  return sendResponse(res, 200, "Session is valid");
});

// // authRouter.post('/logout', logout);

export default authRouter;
