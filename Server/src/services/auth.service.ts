import Auth from "../models/AuthModal";
import { UserSignupInput } from "../Types/AuthTypes";

export const RegisterService = async (userData: UserSignupInput) => {
  const newUser = await Auth.create(userData);
  return newUser;
};

