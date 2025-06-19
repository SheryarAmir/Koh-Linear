import Auth from "../models/AuthModal";
import { UserSignupInput } from "../Types/AuthTypes";

export const RegisterService = async (userData: UserSignupInput) => {
  const newUser = await Auth.create(userData);
  
  return newUser;


};



export const SignInService = async (email: string ) => {
  return await Auth.findOne({ email  }); // returns a single user
};
