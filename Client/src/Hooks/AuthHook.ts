import { useMutation , useQuery } from "@tanstack/react-query";
import { registerUser ,signInUser, logoutUser,getUserDetails  } from "@/Services/AuthServices"
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
      router.push("/hero");
    },

    onError: (error:any) => {
     
      const backendMessage = error?.response?.data?.message || "An unexpected error occurred";
      alert(backendMessage);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      localStorage.clear();
      sessionStorage.clear();
      router.push("/SignIn");
      window.location.reload();
    },
    onError: (error: any) => {
      const backendMessage = error?.response?.data?.message || "An unexpected error occurred";
      alert(backendMessage);
    },
  });
};




export const useUserDetails = () => {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: getUserDetails ,
  });
};






