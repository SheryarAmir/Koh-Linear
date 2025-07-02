import { useMutation , useQuery } from "@tanstack/react-query";
import { registerUser ,signInUser, logoutUser,getUserDetails  } from "@/Services/AuthServices"
import { useRouter } from "next/navigation";  
import { toast } from "sonner";




 
export const useRegister = () => {

 const router = useRouter()
  return useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
    
      toast.success(data.message || "Registration successful!");
      router.push("/SignIn")

    },

    onError: (error:any) => {
     
      const backendMessage = error?.response?.data?.message || "An unexpected error occurred";
      toast.error(backendMessage);
    },
  });
};


export const SignIn = () => {

   const router = useRouter()

  return useMutation({
    mutationFn: signInUser,

    onSuccess: (data) => {
      toast.success(data.message || "Sign in successful!");
      router.push("/newTicket");
    },

    onError: (error:any) => {
     
      const backendMessage = error?.response?.data?.message || "An unexpected error occurred";
      toast.error(backendMessage);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      toast.success(data.message || "Logout successful!");
      localStorage.clear();
      sessionStorage.clear();
      router.push("/SignIn");
      window.location.reload();
    },
    onError: (error: any) => {
      const backendMessage = error?.response?.data?.message || "An unexpected error occurred";
      toast.error(backendMessage);
    },
  });
};





