
import {authenApi} from "../api";

export const userApi = {
  get(userID) {
    return authenApi.get("/user/" + userID);
  }
};
