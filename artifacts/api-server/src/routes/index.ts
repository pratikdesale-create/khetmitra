import { Router, type IRouter } from "express";
import healthRouter from "./health";
import diagnosesRouter from "./diagnoses";
import shopsRouter from "./shops";
import weatherRouter from "./weather";
import schemesRouter from "./schemes";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(diagnosesRouter);
router.use(shopsRouter);
router.use(weatherRouter);
router.use(schemesRouter);
router.use(dashboardRouter);

export default router;
