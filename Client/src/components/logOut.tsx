import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { userLogoutService } from "@/Services/userLogoutService";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    console.log("Logout button clicked"); 
    try {
      await userLogoutService();
      toast.success("Logout successful!");
      router.replace("/SignIn");
    } catch (error: any) {
      toast.error(error?.message || "Logout failed");
    }
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
};

export default LogoutButton;