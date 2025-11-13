import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";

const useServiceStore = create((set) => {
  return {
    services: [],
    createService: async (formData) => {
      try {
        await axiosInstance.post("/service/create", formData);
      } catch (error) {
        console.log(error);
      }
    },
    getServices: async () => {
      try {
        const result = await axiosInstance.get("/service/get-services");
        set({ services: result.data.services || [] });
      } catch (error) {
        console.log(error);
      }
    },
  };
});

export default useServiceStore;
