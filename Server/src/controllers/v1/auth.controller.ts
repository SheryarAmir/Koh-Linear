import { NextFunction, Request, Response } from "express";
import Auth from "../../models/AuthModal";

// import JWT from "jsonwebtoken";
import { env } from "process";

import { RegisterSchema } from "../../schema/Auth.schema";
import * as authService from "../../services/auth.service";
import { HttpStatus } from "../../utils/httpStatus";

import dotenv from "dotenv";
dotenv.config();

export const Register = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);

    const userData = RegisterSchema.parse(req.body);

    const newUser = await authService.RegisterService(userData);

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

// export async function login(req: Request, res: Response): Promise<void> {
//   const { email, password } = req.body;

//   try {

//     // const loginUser=SignInSchema.parse(req.body)
//     const user = await Auth.findOne(email ,password );

//     // check if user exists
//     if (!user) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }
//     // check if password is correct
//     if (user.password !== password) {
//       res.status(401).json({ message: "Incorrect password" });

//       return;
//     }
//     // Generate JWT token
//     const secret = process.env.JWT_SECRET;
//     console.log({secret})
//     if (!secret) {
//       res
//         .status(500)
//         .json({ message: "JWT secret not found in environment variables" });
//       return;
//     }

//     const accessToken = JWT.sign({ email: user.email, id:user._id }, secret, {
//       expiresIn: "1h",
//     });

//     // Respond with success message and token
//     // console.log(accessToken)
//  res
//   .cookie("accessToken", accessToken,{
//      httpOnly: true,
//     secure: false, // true in production
//     sameSite: "lax",
//     maxAge: 24 * 60 * 60 * 1000,
//   }).status(200) .json({ message: "Login successful", ExistUser:user });
//   }
//    catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// }
