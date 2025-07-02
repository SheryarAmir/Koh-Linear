import { api } from "@/api/api";

export async function userLogoutService() {
  try {
    const res = await api.post("/v1/auth/logout");
    return res;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to logout");
  }
} 