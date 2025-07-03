import { NextFunction, Request, Response } from "express";
import Auth from "../../models/AuthModal";
import JWT from "jsonwebtoken";
import { env } from "process";
import { RegisterSchema, SignInSchema } from "../../schema/Auth.schema";
import { RegisterService, SignInService } from "../../services/auth.service";

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
    console.log("Incoming data:", req.body);

    // Validate input using Zod
    const userData = SignInSchema.parse(req.body);

    // Fetch user from DB
    const user = await SignInService(userData.email);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!user.password) {
      res.status(500).json({ message: "User password missing in DB" });
      return;
    }

    if (user.password !== userData.password) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    console.log(`${user.password} ${userData.password}`);

    // Generate JWT token
    const secret = process.env.JWT_SECRET;
    console.log({ secret });

    if (!secret) {
      res
        .status(500)
        .json({ message: "JWT secret not found in environment variables" });
      return;
    }
    const accessToken = JWT.sign({ email: user.email, id:user._id}, secret, {
      expiresIn: "1h",
    });

    // Respond with success message and token
    // console.log(accessToken)
      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: false, // true in production
          sameSite: "lax",
          maxAge: 24 * 60 * 60 * 1000,
          path:"/"
        })
        .status(200)
        .json({ message: "Login successful",
          token: accessToken
          , ExistUser: user });
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    } else {
      console.error("Login error:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}

export const Logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    console.log("User logged out");
    res.status(HttpStatus.OK).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Logout failed" });
  }
};


export const getUserDetails= async(req:Request , res:Response)=>{

 

  res.json({message : "user data"})
}