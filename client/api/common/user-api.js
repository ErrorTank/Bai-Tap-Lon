
import {authenApi} from "../api";

export const userApi = {
  get(userID) {
    return authenApi.get("/user/" + userID);
  },
  changePassword(accountID, obj){
    return authenApi.put(`/account/${accountID}/change-password`, obj);
  },
  update(user){
    return authenApi.put(`/user/${user.userID}`, {user});
  },
  deleteUser(userID){
    return authenApi.delete(`/user/${userID}`)
  },
  getUserByAccountID(accountID){
    return authenApi.get(`/user/account/${accountID}`);
  },
  createUser(user){
    return authenApi.post("/user", {user})
  },
  checkUserExisted(user){
    return authenApi.post("/user/check", {user})
  }
};
