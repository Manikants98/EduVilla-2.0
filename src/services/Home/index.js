import axios from "../../config/axios";
import { API_URLS } from "../../config/apiUrls";

export const homeFn = () => {
  try {
    const response = axios.get(API_URLS.home);
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
