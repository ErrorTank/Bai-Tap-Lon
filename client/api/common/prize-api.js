import {authenApi} from "../api";
import {urlUtils} from "../../common/url-utils";

export const prizeApi = {
  createPrize(prize, keyPath){
    return authenApi.postMultipart(`/prize/create`, prize, keyPath)
  },
  get(prizeID){
    return authenApi.get("/prize/" + prizeID);
  },
  deletePrize(prizeID){
    return authenApi.delete("/prize/" + prizeID)
  },
  update(prize, key){
    console.log(prize)
    return authenApi.postMultipart("/prize/update", prize ,key)
  },
  getPrizeBrief(filters){
    let {skip, take, filter = {}, sort} = filters || {};

    let {key, asc} = sort || {};
    let params = {
      orderAsc: asc,
      orderBy: key,
      skip,
      take,
      keyword: filter.keyword || null
    };
    return authenApi.get(`/prize/brief${urlUtils.buildParams(params)}`)
  },
};

