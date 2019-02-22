import {authenApi} from "../api";
import {urlUtils} from "../../common/url-utils";

export const subjectApi = {
  create(subject){
    return authenApi.post(`/subject/create`, {subject})
  },
  get(subjectID){
    return authenApi.get("/subject/" + subjectID);
  },
  getSubjectsBrief() {
    return authenApi.get("/subjects/brief-no-con");
  },
  delete(subjectID){
    return authenApi.delete("/subject/" + subjectID)
  },
  checkSupervisorExisted(subject) {
    return authenApi.post("/subject/check", {subject})
  },
  update(subject){
    return authenApi.put(`/subject/${subject.subjectID}`, {subject});
  },
  getBrief(filters){
    let {skip, take, filter = {}, sort} = filters || {};

    let {key, asc} = sort || {};
    let params = {
      orderAsc: asc,
      orderBy: key,
      skip,
      take,
      keyword: filter.keyword || null
    };
    return authenApi.get(`/subject/brief${urlUtils.buildParams(params)}`)
  },
};

