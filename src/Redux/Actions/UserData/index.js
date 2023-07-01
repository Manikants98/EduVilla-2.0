import { USER_DATA } from "../../ActionTypes/UserData";

export const setUserData = (payload) => {
  return {
    type: USER_DATA,
    payload,
  };
};
