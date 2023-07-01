import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "https://api-eduvila.onrender.com/",
  // baseURL: "http://localhost:3001/",
});

const errorHandler = (error) => {
  if (error?.response?.data?.message) {
    toast.error(error?.response?.data?.message);
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return errorHandler(error);
  }
);

export default axiosInstance;
