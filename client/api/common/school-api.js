
import {authenApi} from "../api";

export const schoolApi = {
  get(schoolID) {
    return authenApi.get("/school/" + schoolID);
  },
  changePassword(accountID, obj){
    return authenApi.put(`/account/${accountID}/change-password`, obj);
  },
  update(user){
    return authenApi.put(`/user/${user.userID}`, {user});
  },
  getSchoolByAccountID(accountID){
    return authenApi.get(`/school/account/${accountID}`);
  }
};
