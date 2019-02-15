
import {authenApi} from "../api";
import {urlUtils} from "../../common/url-utils";

export const schoolPresenterApi = {
  get(spID) {
    return authenApi.get("/sp/" + spID);
  },
  getSpBrief(filters){
    let {skip, take, filter = {}, sort} = filters || {};

    let {key, asc} = sort || {};
    let params = {
      orderAsc: asc,
      orderBy: key,
      skip,
      take,
      keyword: filter.keyword || null,
      sID: filter.school.value
    };
    return authenApi.get(`/sp/brief${urlUtils.buildParams(params)}`)
  },
  update(sp){
    return authenApi.put(`/sp/${sp.spID}`, {sp});
  },
  deleteSp(spID){
    return authenApi.delete(`/sp/${spID}`)
  },
  getSpByAccountID(accountID){
    return authenApi.get(`/sp/account/${accountID}`);
  },
  createSchoolPresenter(sp){
    return authenApi.post("/sp", {sp})
  },
  checkSpExisted(sp){
    return authenApi.post("/sp/check", {sp})
  }
};
