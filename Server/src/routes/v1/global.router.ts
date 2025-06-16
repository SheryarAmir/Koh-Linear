import { Router } from "express";
import healthRouter from "./health.router";
import authRouter from "./auth.router";

const Api1 = Router();

Api1.use("/health", healthRouter);
Api1.use("/auth", authRouter);

export default Api1;
