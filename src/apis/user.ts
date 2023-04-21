import { baseApi } from "./index";

export const userApi = {
  login: (Data: any) => baseApi.post(`/auth/login`, Data),

  getUser: (token: string) =>
    baseApi.get(`/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  setting: (Data: any) => baseApi.post(`/user/setting`, Data),
  register: (Data: any) => {
    const res = baseApi.post("/user/register", Data);
    return res;
  },
};

export default { userApi };
