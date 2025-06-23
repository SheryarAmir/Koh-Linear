import { Router } from "express";
import healthRouter from "./health.router";
import authRouter from "./auth.router";
import ticketsRouter from "./tickets.router"

const Api1 = Router();

Api1.use("/health", healthRouter);
Api1.use("/auth", authRouter);
Api1.use("/ticket", ticketsRouter)

export default Api1;


