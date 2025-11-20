import express from "express";
import {createDocket,getSummary,listDockets} from "../controller/docket.controller.js";
import { docketSchema } from "../validation/docket.validation.js";
import { validateBody } from "../../../middlewares/validate.js";

const router = express.Router();

router.get("/dockets/summary", getSummary);
router.post("/:jobId/dockets",validateBody(docketSchema),createDocket);
router.get('/:jobId/dockets', listDockets);

export default router;
