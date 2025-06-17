// import { useQuery } from "@tanstack/react-query"

import {registerUser} from "@/Services/AuthServices"
import { useMutation, useQuery} from '@tanstack/react-query';
// import { useRouter } from "next/navigation";

// import { AuthTypes } from "@/types/AuthTypes";





export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log(" User registered:", data);

    
    },
    onError: (error: any) => {
      if (error.response?.data?.issues) {
        
        console.log("Zod validation errors:", error.response.data.issues);
      } else {
        console.log(" Signup failed:", error.message);
      }
    },
  });
};


// export const useLogin = () => {
//   const router = useRouter(); 

//   return useMutation({
//     mutationFn: loginUser,
//     onSuccess: (data) => {
//       router.push("/postCar");
//     },
//     onError: (error: any) => {   
//       alert(`Login error in AuthHooks: ${error.message}`);
//     },
//   });
// };