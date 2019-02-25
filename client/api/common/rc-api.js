
import {authenApi} from "../api";
import {userInfo} from "../../common/states/user-info";
import {urlUtils} from "../../common/url-utils";

export const rcApi = {

  create(rc) {
    return authenApi.post("/rc/create" ,{rc});
  },
  update(rc){
    return authenApi.put(`/rc/${rc.rcID}`, {rc});
  },
  getRcBrief(filters){
    let {skip, take, filter = {}, sort} = filters || {};
    let {key, asc} = sort || {};
    let params = {
      orderAsc: asc,
      orderBy: key,
      skip,
      take,
      gender: filter.gender ? filter.gender.value : null,
      keyword: filter.keyword || null,
      sID: filter.sID
    };
    return authenApi.get(`/rc/brief${urlUtils.buildParams(params)}`)
  },
  delete(rcID){
    return authenApi.delete(`/rc/${rcID}`)
  },
  getCandidateByAccountID(accountID){
    return authenApi.get(`/candidate/account/${accountID}`);
  },
  checkRc(rcID, sID){
    return authenApi.post("/rc/check", {rcID, sID})
  },
  get(rcID){
    return authenApi.get(`/rc/${rcID}`)
  },
};
