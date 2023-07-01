import axios from "../../config/axios";
import { API_URLS } from "../../config/apiUrls";

export const updateProfileFn = (reqBody) => {
  try {
    const response = axios.put(API_URLS.updateProfile, reqBody);
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
