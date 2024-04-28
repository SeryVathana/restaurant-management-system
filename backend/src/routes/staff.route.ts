import express from "express";
import { createStaff, deleteStaffById, getAllStaffs, updateStaffById } from "../controllers/staff.controller";

const staffRouter = express.Router();

staffRouter.get("/getAllStaffs", getAllStaffs);

// staffRouter.get("/getStaffById/:id", getStaffById);
// staffRouter.get("/getStaffsByJob/:job_title", getStaffsByJob);

staffRouter.post("/addNewStaff", createStaff);
staffRouter.put("/updateStaffById/:id", updateStaffById);
staffRouter.delete("/deleteStaffById/:id", deleteStaffById);

export default staffRouter;
