import { Router } from "express";
import * as healthController from '../../controllers/v1/health.controller'

const healthRouter = Router();


healthRouter.get("/", healthController.health);

export default healthRouter;
