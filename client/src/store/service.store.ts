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
    // getServices: async () => {
    //   try {
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  };
});

export default useServiceStore;
