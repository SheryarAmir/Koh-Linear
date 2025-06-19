import { Router } from "express";
import * as authController from "../../controllers/v1/auth.controller";

const authRouter = Router();

authRouter.post("/login", authController.SignIn);
authRouter.post("/register", authController.Register);

export default authRouter;