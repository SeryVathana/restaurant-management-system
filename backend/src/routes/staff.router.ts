import express from "express";
import { addNewStaff, deleteStaffById, getAllStaffs, getStaffById, updateStaffById } from "../controllers/staff.controller";
import { checkLogin, checkPermission } from "../middlewares/auth.middleware";

const route = express.Router();

route.use(checkLogin);
route.use(checkPermission);

route.get("/getAllStaffs", getAllStaffs);
route.get("/getStaffById", getStaffById);
route.put("/updateStaffById", updateStaffById);
route.post("/addNewStaff", addNewStaff);
route.delete("/deleteStaffById", deleteStaffById);

export default route;
