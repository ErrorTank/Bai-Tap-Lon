import {authenApi} from "../api";
import {urlUtils} from "../../common/url-utils";

export const contestApi = {
  create(contest){
    console.log(contest)
    return authenApi.post(`/contest/create`, {contest})
  },
  get(contestID){
    return authenApi.get("/contest/" + contestID);
  },
  delete(contestID){
    return authenApi.delete("/contest/" + contestID)
  },
  checkContestExisted(contest) {
    return authenApi.post("/contest/check", {contest})
  },
  getContestsBrief() {
    return authenApi.get("/contests/brief-no-con");
  },
  update(contest){
    return authenApi.put(`/contest/${contest.contestID}`, {contest});
  },
  getBrief(filters){
    let {skip, take, filter = {}, sort} = filters || {};

    let {key, asc} = sort || {};
    let params = {
      orderAsc: asc,
      orderBy: key,
      skip,
      take,
      keyword: filter.keyword || null,
      canSeeResult: filter.canSeeResult.value,
    };
    return authenApi.get(`/contest/brief${urlUtils.buildParams(params)}`)
  },
};

