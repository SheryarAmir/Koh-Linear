import { Router } from "express";
import * as authController from "../../controllers/v1/auth.controller";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);

export default authRouter;