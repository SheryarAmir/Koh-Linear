import { NextFunction, Request, Response } from "express";
import Auth from "../../models/AuthModal";
import JWT from "jsonwebtoken";
import { env } from "process";
import { RegisterSchema ,SignInSchema} from "../../schema/Auth.schema";
import { RegisterService,SignInService}  from "../../services/auth.service";

import { HttpStatus } from "../../utils/httpStatus";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { ZodError } from "zod";

dotenv.config();

export const Register = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);

    const userData = RegisterSchema.parse(req.body);

    const newUser = await RegisterService(userData);

    res.status(HttpStatus.CREATED).json({
      message: "User successfully signed up",
      newUser: newUser,
    });
    
  } catch (error: any) {

    // Zod validation error
    if (error.name === "ZodError") {
      console.error("Zod validation failed:", error.errors);
      res.status(HttpStatus.BAD_REQUEST).json({
 message: "Validation error",
        issues: error.errors,
      });

      // ❌ MongoDB Duplicate Email Error
    } else if (error.code === 11000 && error.keyPattern?.email) {
      console.error("Duplicate email error:", error.message);
      res.status(HttpStatus.CONFLICT).json({
        message: "Email already exists",
      });

      // 🛠 Other Errors
    } else {
      console.error("Signup error:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Signup failed",
        error: error.message || error,
      });
    }
  }
};


// this function handles user sign-in

export async function SignIn(req: Request, res: Response): Promise<void> {

  try {
    const userData = SignInSchema.parse(req.body);

    const user = await SignInService(userData.email);

    console.log("output of signin services ", user);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!user.password) {
      res.status(500).json({ message: "User password not found" });
      return;
    }


    const isMatch = await bcrypt.compare(userData.password, user.password);

    console.log(`password incoming  ${userData.password} and password in database ${user.password}`);
    if (!isMatch) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    // const secret = process.env.JWT_SECRET;
    // if (!secret) {
    //   res.status(500).json({ message: "JWT secret not set" });
    //   return;
    // }

    // const token = JWT.sign(
    //   { email: user.email, id: user._id },
    //   secret,
    //   { expiresIn: "1h" }
    // );

    // res
    //   .cookie("accessToken", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "lax",
    //     maxAge: 24 * 60 * 60 * 1000, // 1 day
    //   })


      res.status(200)
      .json({ message: "Login successful", userData });


  

  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: "Validation failed", errors: error.errors });
      return;
    }

    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
