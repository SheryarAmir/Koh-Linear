// Services/AuthServices.ts
import { api } from "@/api/api";
import { AuthTypes ,SignInTypes } from "@/Types/AuthTypes";

export const registerUser = async (user: AuthTypes) => {

  const res = await api.post("/v1/auth/register", user);

  // console.log(res.data);

  return res.data;
};


export const signInUser = async (user: SignInTypes) => {

  const res = await api.post("/v1/auth/SignIn", user);

  // Log the access token specifically
  console.log("Access Token:", res.data.token || res.data.accessToken);
  console.log(res.data);

  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/v1/auth/logout", {}, {
    withCredentials: true
  });
  return res.data;
};
