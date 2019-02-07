
import {authenApi} from "../api";

export const userApi = {
  get(userID) {
    return authenApi.get("/user/" + userID);
  },
  changePassword(accountID, obj){
    return authenApi.put(`/account/${accountID}/change-password`, obj);
  }
};
