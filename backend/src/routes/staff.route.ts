import express from "express";
import {
  createStaff,
  deleteStaffById,
  getAllStaffs,
  getStaffById,
  getStaffsByJob,
  updateStaffById,
} from "../controllers/staff.controller";

const staffRouter = express.Router();

staffRouter.get("/getAllStaffs", getAllStaffs);

staffRouter.get("/getStaffById/:id", getStaffById);
staffRouter.get("/getStaffsByJob/:job_title", getStaffsByJob);

staffRouter.post("/createStaff", createStaff);

staffRouter.patch("/updateStaffById", updateStaffById);

staffRouter.delete("/deleteStaffById/:id", deleteStaffById);

export default staffRouter;
