// hooks/useRegister.ts
import { useMutation } from "@tanstack/react-query";
import { registerUser ,signInUser } from "@/Services/AuthServices";
import { AuthTypes  } from "@/Types/AuthTypes"
import { SignInTypes } from "@/Types/AuthTypes";  


export const useRegister = () => {
  return useMutation<any, any, AuthTypes>({
    mutationFn: registerUser,

    onSuccess: (data) => {
    
      alert(data.message); 
    },

    onError: (error) => {
     
      const backendMessage = error?.response?.data?.message || "An unexpected error occurred";
      alert(backendMessage);
    },
  });
};


export const SignIn = () => {
  return useMutation<any, any, SignInTypes>({
    mutationFn: signInUser,

    onSuccess: (data) => {
    
      alert(data.message); 
    },

    onError: (error) => {
     
      const backendMessage = error?.response?.data?.message || "An unexpected error occurred";
      alert(backendMessage);
    },
  });
};





