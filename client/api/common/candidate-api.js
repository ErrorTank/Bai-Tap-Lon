
import {authenApi} from "../api";

export const candidateApi = {
  get(candidateID) {
    return authenApi.get("/candidate/" + candidateID);
  },
  changePassword(accountID, obj){
    return authenApi.put(`/account/${accountID}/change-password`, obj);
  },
  update(user){
    return authenApi.put(`/user/${user.userID}`, {user});
  },
  getCandidateByAccountID(accountID){
    return authenApi.get(`/candidate/account/${accountID}`);
  },
  createCandidate(candidate){
    return authenApi.post("/candidate", {candidate})
  },
  checkCandidateExisted(candidate){
    return authenApi.post("/candidate/check", {candidate})
  }
};
