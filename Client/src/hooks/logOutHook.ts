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
        router.push("/SignIn");
        window.location.reload();
      } else {
        toast.error("Failed to logout. Please try again.");
        console.error("Logout failed: Cookie not removed (backend did not confirm logout)");
        // Do NOT redirect
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to logout.");
      console.error("Logout failed:", error);
      // Do NOT redirect
    },
  });
}
