import axios from "../../config/axios";
import { API_URLS } from "../../config/apiUrls";

export const loginFn = (redBody) => {
  try {
    const response = axios.post(API_URLS.login, redBody);
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
