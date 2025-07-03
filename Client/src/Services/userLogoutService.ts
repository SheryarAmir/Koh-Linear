import { api } from "@/api/api";

export async function userLogoutService() {
  console.log("Calling logout api")
  try {
    const res = await api.post("/v1/auth/logout");
    return res.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to logout");
  }
}
