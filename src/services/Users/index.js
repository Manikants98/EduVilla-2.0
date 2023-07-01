import axios from "../../config/axios";
import { API_URLS } from "../../config/apiUrls";

export const users = () => {
  try {
    const response = axios.get(API_URLS.users);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserFn = () => {
  try {
    const response = axios.get(API_URLS.user, {
      params: { token: localStorage.getItem("token") },
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
