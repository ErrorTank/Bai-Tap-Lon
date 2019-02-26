
import {authenApi} from "../api";
import {userInfo} from "../../common/states/user-info";
import {urlUtils} from "../../common/url-utils";

export const candidateApi = {
  get(candidateID) {
    return authenApi.get("/candidate/" + candidateID);
  },
  update(candidate){
    return authenApi.put(`/candidate/${candidate.cID}`, {candidate});
  },
  getCandidatesBrief() {
    return authenApi.get("/candidates/brief-no-con");
  },
  getCandidatesByContestID(contestID){
    return authenApi.get("/candidates/contest/" + contestID);
  },
  getCandidateBrief(filters){
    let {skip, take, filter = {}, sort} = filters || {};
    let {key, asc} = sort || {};
    let params = {
      orderAsc: asc,
      orderBy: key,
      skip,
      take,
      gender: filter.gender ? filter.gender.value : null,
      keyword: filter.keyword || null,
      sID: filter.school.value
    };
    return authenApi.get(`/candidate/brief${urlUtils.buildParams(params)}`)
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
