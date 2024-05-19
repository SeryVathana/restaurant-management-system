import express from "express";
import {
  getTenNewestUsers,
  getTotalCustomers,
  getTotalFood,
  getTotalOrders,
  getTotalOrdersForLast6Months,
  getTotalStaffs,
} from "../controllers/dashboard.controller";

const dashboardRouter = express.Router();

dashboardRouter.get("/gettotalcustomers", getTotalCustomers);
dashboardRouter.get("/gettotalorders", getTotalOrders);
dashboardRouter.get("/gettotalfood", getTotalFood);
dashboardRouter.get("/gettotalstaffs", getTotalStaffs);
dashboardRouter.get("/getnewestusers", getTenNewestUsers);
dashboardRouter.get("/gettotalorderlast6month", getTotalOrdersForLast6Months);

export default dashboardRouter;
// Path: backend/src/routes/index.ts
