
import {authenApi} from "../api";

export const schoolPresenterApi = {
  get(spID) {
    return authenApi.get("/sp/" + spID);
  },
  update(sp){
    return authenApi.put(`/sp/${sp.spID}`, {sp});
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
