"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useActionState } from "react"
import { SignInTypes } from "@/Types/AuthTypes"
import { sigInSchema } from "@/lib/validations/register-schema"
import {SignIn} from "@/hooks/AuthHook"

export default function LoginPage() {

    const { mutate, isPending } = SignIn(); 
     
function handlerSignIn(prevState: any,  formData: FormData) {

  const sigin :SignInTypes={
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }



const result = sigInSchema.safeParse(sigin);  

if (!result.success) { 

  const fieldErrors = result.error.flatten().fieldErrors;   
  const errors = Object.values(fieldErrors).flat();

  return {
    errors,  
    enterValues: sigin,  

} // Returning null errors to indicate success
}


const correctData = result.data;   // If validation succeeds, we prepare the data for submission



  mutate(correctData); // useMutation call
  console.log("correctData", correctData);
  return { errors: null }; 
}

const[fromState, fromAction] = useActionState(handlerSignIn, {errors: null}); 



  return (
    <div className="py-16 lg:grid lg:grid-cols-2 container mx-auto ">
      {/* Left Side - Image */}
      <div className="hidden lg:block relative">
        <Image
          src="/kanban.avif"
          alt="Kho-Linear Login"
          fill
          className="object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Welcome back to Kho-Linear</h2>
          <p className="text-lg opacity-90">Continue your journey with us</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Sign in to your account</h1>
            <p className="text-muted-foreground">Enter your credentials to access Kho-Linear</p>
          </div>

          {/* Form */}
          <form action={fromAction} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" name="email" placeholder="Enter your email" className="h-11" defaultValue={fromState.enterValues?.email} />
              </div>



              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" placeholder="Enter your password"  className="h-11" />
              </div>
            </div>


 {fromState.errors && <ul> 
              {fromState.errors.map((error: string, index: number) => (
                <li key={index} className="text-red-600 text-sm">
                  {error}
                </li>
              ))}
              </ul>}

            <Button type="submit" className="w-full h-11 text-base">
              Sign in
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-11">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
              Twitter
            </Button>
          </div>

          {/* Sign up link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link href="/Register" className="font-medium text-primary hover:underline">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
