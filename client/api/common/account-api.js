
import {authenApi} from "../api";

export const accountApi = {
  get(userID) {
    return authenApi.get("/user/" + userID);
  },
  changePassword(accountID, obj){
    return authenApi.put(`/account/${accountID}/change-password`, obj);
  },
  update(account){
    return authenApi.put(`/account/${account.accountID}`, {account});
  },
  checkAccountIDInUser({role, accountID}){
    return authenApi.get(`/account/${accountID}/role/${role}/check-in-user`);
  }
};
