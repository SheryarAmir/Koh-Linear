import { useMutation , useQuery } from "@tanstack/react-query";
import { registerUser ,signInUser,getUserDetails  } from "@/Services/AuthServices"
import { useRouter } from "next/navigation";  
import { toast } from "sonner";
import { useEffect } from "react";




 
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
      
      router.push("/hero");
    },

    onError: (error:any) => {
     
      const backendMessage = error?.response?.data?.message || "An unexpected error occurred";
      toast.error(backendMessage);
    },
  });
};


export const useUserDetails = () => {
  const query = useQuery({
    queryKey: ["userDetails"],
    queryFn: getUserDetails,
  });

  useEffect(() => {
    if (query.isSuccess) {
      toast.success("User details fetched successfully!");
    }
    if (query.isError) {
      const err = query.error as any;
      const backendMessage = err?.response?.data?.message || "Failed to fetch user details";
      toast.error(backendMessage);
    }
  }, [query.isSuccess, query.isError, query.error]);

  return query;
};






