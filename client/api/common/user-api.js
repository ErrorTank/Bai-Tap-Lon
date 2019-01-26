
import {authenApi} from "../api";

export const userApi = {
  get(userID) {
    return authenApi.get("/user/" + userID);
  },
  getRoles() {
    return api.get("/user/roles");
  },
  update(user) {
    return api.put("/user", user);
  },
  changePassword(data) {
    return api.put("/user/change-password", data);
  },
};
