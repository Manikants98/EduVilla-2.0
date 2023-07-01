import axios from "../../config/axios";
import { API_URLS } from "../../config/apiUrls";

export const getCourseFn = (id) => {
  try {
    const response = axios.get(API_URLS.getCourses, {
      params: { id: id ? id : "" },
    });
    return response;
  } catch ({ error }) {
    throw new Error(error.message);
  }
};
