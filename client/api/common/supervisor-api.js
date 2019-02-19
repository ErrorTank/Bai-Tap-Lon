import {authenApi} from "../api";
import {urlUtils} from "../../common/url-utils";

export const supervisorApi = {
  create(supervisor){
    return authenApi.post(`/supervisor/create`, {supervisor})
  },
  get(supervisorID){
    return authenApi.get("/supervisor/" + supervisorID);
  },
  delete(supervisorID){
    return authenApi.delete("/supervisor/" + supervisorID)
  },
  checkSupervisorExisted(supervisor) {
    return authenApi.post("/supervisor/check", {supervisor})
  },
  update(supervisor){
    return authenApi.put(`/supervisor/${supervisor.supervisorID}`, {supervisor});
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
    return authenApi.get(`/supervisor/brief${urlUtils.buildParams(params)}`)
  },
};

