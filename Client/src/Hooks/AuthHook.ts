
import { useMutation } from "@tanstack/react-query";
import { registerUser ,signInUser } from "@/Services/AuthServices"
import { useRouter } from "next/navigation";  




 
export const useRegister = () => {

 const router = useRouter()
  return useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
    
      alert(data.message); 
      router.push("/SignIn")

    },

    onError: (error:any) => {
     
      const backendMessage = error?.response?.data?.message || "An unexpected error occurred";
      alert(backendMessage);
    },
  });
};


export const SignIn = () => {

   const router = useRouter()

  return useMutation({
    mutationFn: signInUser,

    onSuccess: (data) => {
      alert(data.message); 
      router.push("/newTicket");
    },

    onError: (error:any) => {
     
      const backendMessage = error?.response?.data?.message || "An unexpected error occurred";
      alert(backendMessage);
    },
  });
};





