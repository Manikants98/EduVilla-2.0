import axios from "../../config/axios";
import { API_URLS } from "../../config/apiUrls";

export const ContactUsFn = (reqBody) => {
  try {
    const response = axios.post(API_URLS.contactUs, reqBody );
    return response;
  } catch ({ error }) {
    throw Error(error.message);
  }
};
