
import {z} from "zod"

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters" }),
  fullName: z.string().min(1, { message: "Full name is required" }), // changed here
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
    

// export const SignInSchema=z.object({
//   email:z.string().email({message : "Invalid email fromat"}),
// password: z.string().min(6,{message :"password must be 6 characters"})
// })
