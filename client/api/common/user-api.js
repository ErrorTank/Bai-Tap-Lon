
import {authenApi} from "../api";

export const userApi = {
  get(userID) {
    return authenApi.get("/user/" + userID);
  },
  changePassword(accountID, newPassword){
    return authenApi.put(`/account/${accountID}/change-password`, newPassword);
  }
};
