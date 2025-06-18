// hooks/useRegister.ts
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/Services/AuthServices";
import { AuthTypes } from "@/Types/AuthTypes";

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



