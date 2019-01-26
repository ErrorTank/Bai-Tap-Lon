
import {authenApi} from "../api";

export const authenticationApi = {
  getInfo() {
    return authenApi.get("/auth");
  }
};
