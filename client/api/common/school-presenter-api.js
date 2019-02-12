
import {authenApi} from "../api";

export const schoolPresenterApi = {
  get(spID) {
    return authenApi.get("/sp/" + spID);
  },
  update(sp){
    return authenApi.put(`/sp/${sp.spID}`, {sp});
  },
  getSchoolByAccountID(accountID){
    return authenApi.get(`/school/account/${accountID}`);
  }
};
