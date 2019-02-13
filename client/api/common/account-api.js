
import {authenApi} from "../api";
import {userInfo} from "../../common/states/user-info";
import {urlUtils} from "../../common/url-utils";

export const accountApi = {
  get(userID) {
    return authenApi.get("/user/" + userID);
  },
  changePassword(accountID, obj){
    return authenApi.put(`/account/${accountID}/change-password`, obj);
  },
  getAccountBrief(filters){
    let {role} = userInfo.getState();
    let {skip, take, filter = {}, sort} = filters || {};

    let {key, asc} = sort || {};
    let params = {
      orderAsc: asc,
      orderBy: key,
      skip,
      take,
      role: filter.role.value,
      canLogin: filter.canLogin.value,
      keyword: filter.keyword || null,
    };
    return authenApi.get(`/accounts/${role}/brief${urlUtils.buildParams(params)}`)
  },
  deleteAccount(accountID){
    return authenApi.delete(`/account/${accountID}`)
  },
  update(account){
    return authenApi.put(`/account/${account.accountID}`, {account});
  },
  checkAccountIDInUser({role, accountID}){
    return authenApi.get(`/account/${accountID}/role/${role}/check-in-user`);
  },
  createAccount(payload){
    return authenApi.post("/account/create", {...payload})
  },

  checkAccountExisted(account){
    return authenApi.post("/account/check", {account})
  }
};
