import express from "express";
import {closeJob,createJob,getJobById,listJobs} from "../controller/job.controller.js";
import { validateBody } from "../../../middlewares/validate.js";
import { jobSchema, updateJobSchema } from "../validation/job.validation.js";

const router = express.Router();

router.post("/",validateBody(jobSchema), createJob);
router.get("/", listJobs);
router.get("/:id", getJobById);
router.patch("/:id/close",validateBody(updateJobSchema), closeJob);

export default router;
