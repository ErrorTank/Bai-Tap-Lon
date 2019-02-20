import {authenApi} from "../api";
import {urlUtils} from "../../common/url-utils";

export const orgLocationApi = {
  createOrgLocation(orgLocation){
    return authenApi.post(`/org-location/create`, {orgLocation})
  },
  get(orgLocationID){
    return authenApi.get("/org-location/" + orgLocationID);
  },
  delete(orgLocationID){
    return authenApi.delete("/org-location/" + orgLocationID)
  },
  checkSupervisorExisted(supervisor) {
    return authenApi.post("/supervisor/check", {supervisor})
  },
  update(orgLocation){
    return authenApi.put(`/org-location/${orgLocation.orgLocationID}`, {orgLocation: {...orgLocation}});
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
    return authenApi.get(`/org-location/brief${urlUtils.buildParams(params)}`)
  },
};

