
import {authenApi} from "../api";
import {urlUtils} from "../../common/url-utils";

export const userApi = {
  get(userID) {
    return authenApi.get("/user/" + userID);
  },
  changePassword(accountID, obj){
    return authenApi.put(`/account/${accountID}/change-password`, obj);
  },
  getUserBrief(filters){
    let {skip, take, filter = {}, sort} = filters || {};

    let {key, asc} = sort || {};
    let params = {
      orderAsc: asc,
      orderBy: key,
      skip,
      take,
      keyword: filter.keyword || null,
      accountType: filter.accountType.value
    };
    return authenApi.get(`/user/brief${urlUtils.buildParams(params)}`)
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
