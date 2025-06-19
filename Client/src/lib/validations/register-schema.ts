
import { z } from "zod";

export const RegisterSchema = z .object({
   firstName: z.string().min(3, "First name must be at least 3 characters"),
    lastName: z.string().min(3, "Last name must be at least 3 characters"),
    email: z.string().email("Email must be a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });



  export const sigInSchema=z.object({
email :z.string().email("Email must be a valid email address"),
password: z.string().min(6, "Password must be at least 6 characters"),

  })


  