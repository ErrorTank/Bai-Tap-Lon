
import {authenApi} from "../api";
import {userInfo} from "../../common/states/user-info";

export const candidateApi = {
  get(candidateID) {
    return authenApi.get("/candidate/" + candidateID);
  },
  update(candidate){
    return authenApi.put(`/candidate/${candidate.cID}`, {candidate});
  },
  getCandidateBrief(filters){
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
