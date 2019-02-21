
import {authenApi} from "../api";
import {userInfo} from "../../common/states/user-info";
import {urlUtils} from "../../common/url-utils";

export const rcApi = {
  get(candidateID) {
    return authenApi.get("/candidate/" + candidateID);
  },
  update(candidate){
    return authenApi.put(`/candidate/${candidate.cID}`, {candidate});
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
      keyword: filter.keyword || null
    };
    return authenApi.get(`/rc/brief${urlUtils.buildParams(params)}`)
  },
  deleteCandidate(cID){
    return authenApi.delete(`/candidate/${cID}`)
  },
  getCandidateByAccountID(accountID){
    return authenApi.get(`/candidate/account/${accountID}`);
  },
  createCandidate(candidate){
    return authenApi.post("/candidate", {candidate})
  },
  checkCandidateExisted(candidate){
    return authenApi.post("/candidate/check", {candidate})
  }
};
