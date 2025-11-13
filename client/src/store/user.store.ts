import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";

const useUserStore = create((set) => {
  return {
    message: "",
    user: null,
    token: "",
    refreshToken: "",
    login: async (data: { email: string; password: string }) => {
      try {
        const result = await axiosInstance.post("/auth/login", data);
        set({
          user: result.data.user,
          token: result.data.accessToken,
          message: result.data.message,
        });
      } catch (error: any) {
        set({
          message: error?.response?.data.message || "Something went wrong",
        });
        console.log(error);
      }
    },
    register: async (data: {
      name: string;
      email: string;
      password: string;
      role: string;
    }) => {
      try {
        const result = await axiosInstance.post("/user/register", data);
        set({
          token: result.data.accessToken,
          message: result.data.message,
        });
      } catch (error: any) {
        set({
          message: error?.response?.data.message || "Something went wrong",
        });
        console.log(error);
      }
    },
    profile: async () => {
      try {
        const result = await axiosInstance.get("/user/profile");
        set({
          user: result.data.user,
          token: result.data.accessToken,
          message: result.data.message,
        });
      } catch (error: any) {
        set({
          message: error?.response?.data.message || "Something went wrong",
        });
        console.log(error);
      }
    },
  };
});

export default useUserStore;
