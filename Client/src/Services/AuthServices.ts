// Services/AuthServices.ts
import { api } from "@/lib/axios";
import { AuthTypes ,SignInTypes } from "@/Types/AuthTypes";

export const registerUser = async (user: AuthTypes) => {

  const res = await api.post("/v1/auth/register", user);

  // console.log(res.data);

  return res.data;
};


export const signInUser = async (user: SignInTypes) => {

  const res = await api.post("/v1/auth/SignIn", user);

  console.log(res.data);

  return res.data;
};
