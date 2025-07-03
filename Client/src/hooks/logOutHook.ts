import { useMutation } from "@tanstack/react-query";
import { userLogoutService } from "@/Services/userLogoutService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogout() {
  const router = useRouter();
  return useMutation({
    mutationFn: userLogoutService,
    onSuccess: async (data) => {
      if (data?.message === "Logout successful") {
        toast.success("You have been successfully logged out.");
        router.replace("/SignIn");
      } else {
        toast.error("Failed to logout. Please try again.");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to logout.");
      console.error("Logout failed:", error);
    },
  });
}
