// app/register/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRegister } from "@/hooks/AuthHook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useActionState } from "react";
import { RegisterSchema, } from "@/lib/validations/register-schema";
import { AuthTypes } from "@/Types/AuthTypes";

export default function RegisterPage() {

  const { mutate, isPending } = useRegister();   //  useRegister hook for handling registration
  
function handleRegisterForm(prevState: any, formData: FormData) {   // Function to handle form submission
  
  
  const rawData: AuthTypes = {   // Extracting form data and casting to AuthTypes

  firstName: formData.get("firstName") as string,
  lastName: formData.get("lastName") as string,
  email: formData.get("email") as string,
  password: formData.get("password") as string,
  confirmPassword: formData.get("confirmPassword") as string,
};

const result = RegisterSchema.safeParse(rawData);  // Validating the form data against the RegisterSchema

if (!result.success) {  // If validation fails, extract errors and return them

  const fieldErrors = result.error.flatten().fieldErrors;   // Flattening the errors for easier access
  const errors = Object.values(fieldErrors).flat();// Converting the errors into a flat array

  return {
    errors,  // Returning the errors to be displayed in the form
    enterValues: rawData,   // Returning the entered values to pre-fill the form in case of errors
  };
}

const validData = result.data;   // If validation succeeds, we prepare the data for submission

  mutate(validData); // useMutation call
  return { errors: null };   // Returning null errors to indicate success
}

const [fromState, fromAction] = useActionState(handleRegisterForm , {errors:null}); // Using useActionState to manage form state and handle submission 
  return (
    <div className="lg:grid lg:grid-cols-2 py-16 container mx-auto">
      {/* Left Image Section */}
      <div className="hidden lg:block relative">
        <Image
          src="/girl.jpg"
          alt="Kho-Linear Register"
          fill
          className="object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Join Kho-Linear today</h2>
          <p className="text-lg opacity-90">Start your journey with our powerful platform</p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
            <p className="text-muted-foreground">Get started with Kho-Linear in just a few steps</p>
          </div>
          

          <form action={fromAction} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" name="firstName" type="text"  className="h-11" defaultValue={fromState.enterValues?.firstName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" name="lastName" type="text" className="h-11" defaultValue={fromState.enterValues?.lastName} />
                </div>
              </div>

                 <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" name="email" type="email" className="h-11" defaultValue={fromState.enterValues?.email}  />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" className="h-11"  />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password"  className="h-11" />
              </div>
            </div>

            {fromState.errors && <ul> 
              {fromState.errors.map((error: string, index: number) => (
                <li key={index} className="text-red-600 text-sm">
                  {error}
                </li>
              ))}
              </ul>}

            <div className="flex items-start space-x-2">
              <Checkbox id="terms" className="mt-1" />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and{" "}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </Label>
            </div>

            <Button type="submit" disabled={isPending}>
  {isPending ? "Creating..." : "Create account"}
</Button>

 

          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11">
              {/* Google Icon */}
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-11">
              {/* Twitter Icon */}
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
              Twitter
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/SignIn" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
