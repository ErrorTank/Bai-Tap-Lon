
import {authenApi} from "../api";

export const schoolApi = {
  get(schoolID) {
    return authenApi.get("/school/" + schoolID);
  },
  checkCandidate(cID, sID){
    return authenApi.get(`/school/${sID}/check-candidate/${cID}`);
  },
  getSchoolsBrief(){
    return authenApi.get("/schools/brief");
  },
  update(user){
    return authenApi.put(`/user/${user.userID}`, {user});
  },
  getSchoolByAccountID(accountID){
    return authenApi.get(`/school/account/${accountID}`);
  }
};
