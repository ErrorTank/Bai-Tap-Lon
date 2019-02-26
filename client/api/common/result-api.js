import {authenApi} from "../api";
import {urlUtils} from "../../common/url-utils";

export const resultApi = {
  create(result){
    return authenApi.post(`/result/create`, {result})
  },
  get(resultID){
    return authenApi.get("/result/" + resultID);
  },
  delete(resultID){
    return authenApi.delete("/result/" + resultID)
  },
  getResultsBrief() {
    return authenApi.get("/results/brief-no-con");
  },
  checkResultExisted(result) {
    return authenApi.post("/result/check", {result})
  },
  update(result){
    return authenApi.put(`/result/${result.resultID}`, {result});
  },
  getBrief(filters){
    let {skip, take, filter = {}, sort} = filters || {};

    let {key, asc} = sort || {};
    let params = {
      orderAsc: asc,
      orderBy: key,
      skip,
      take,
    };
    return authenApi.get(`/result/brief${urlUtils.buildParams(params)}`)
  },
};

