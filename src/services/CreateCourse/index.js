import axios from "../../config/axios";
import { API_URLS } from "../../config/apiUrls";

export const createCourseFn = (reqBody) => {
  try {
    const response = axios.post(API_URLS.createCourse, reqBody);
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
