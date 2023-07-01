import axios from "../../config/axios";
import { API_URLS } from "../../config/apiUrls";

export const registerFn = (reqBody) => {
  try {
    const response = axios.post(API_URLS.register, reqBody);
    return response;
  } catch (err) {
  
  }
};

