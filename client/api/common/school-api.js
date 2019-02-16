import {authenApi} from "../api";
import {urlUtils} from "../../common/url-utils";

export const schoolApi = {
  get(schoolID) {
    return authenApi.get("/school/" + schoolID);
  },
  create(school) {
    return authenApi.post("/school/create", {school})
  },

  checkSchoolExisted(school) {
    return authenApi.post("/school/check", {school})
  },
  delete(sID){
    return authenApi.delete(`/school/${sID}`)
  },
  getSchoolsBriefWithCondition(filters) {
    let {skip, take, filter = {}, sort} = filters || {};

    let {key, asc} = sort || {};
    let params = {
      orderAsc: asc,
      orderBy: key,
      skip,
      take,
      keyword: filter.keyword || null,
    };
    return authenApi.get(`/schools/brief${urlUtils.buildParams(params)}`)
  },
  checkCandidate(cID, sID) {
    return authenApi.get(`/school/${sID}/check-candidate/${cID}`);
  },
  getSchoolsBrief() {
    return authenApi.get("/schools/brief-no-con");
  },
  update(school) {

    return authenApi.put(`/school/${school.sID}`, {school});
  },
  getSchoolByAccountID(accountID) {
    return authenApi.get(`/school/account/${accountID}`);
  }
};
