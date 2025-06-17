import { api } from "@/lib/axios";
import { AuthTypes} from "@/Types/AuthTypes";



export const registerUser = async (user: AuthTypes) => {

  const res = await api.post("v1/auth/register", user);

    // console.log(res.data.newUser);

  return res.data.newUser;
};
