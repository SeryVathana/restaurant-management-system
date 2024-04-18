import express from "express";
import {
  getJobById,
  getAllJobs,
  updateJobById,
  createJob,
  deleteJobById,
} from "../controllers/job.controller";

const jobRouter = express.Router();

jobRouter.get("/getAllJobs", getAllJobs);
jobRouter.get("/getJobById/:id", getJobById);

jobRouter.patch("/updateJobById/:id", updateJobById);
jobRouter.post("/createJob", createJob);
jobRouter.delete("/deleteJobById/:id", deleteJobById);

export default jobRouter;
