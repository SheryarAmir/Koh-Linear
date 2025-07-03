import { Router } from "express";
import * as authController from "../../controllers/v1/auth.controller";


const authRouter = Router();

authRouter.post("/SignIn", authController.SignIn);
authRouter.post("/register", authController.Register);
authRouter.post("/logout", authController.Logout);
authRouter.get("/getUserData",authController.getUserDetails);
export default authRouter;
