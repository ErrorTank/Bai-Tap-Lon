import {authenCache} from "../common/cache/authen-cache";
import {userInfo} from "../common/states/user-info";
import {authenApi} from "../api/api";

//todo test jwt(expire) test cookie expire
//todo check jwt expire and cookie expire
export const authenLoader = {
  init() {

    authenApi.addHeader("Authorization", () => {
      let token = authenCache.getAuthen();
      return token ? `Bearer ${token}` : null;
    });



    return authenCache.loadAuthen().then(() => Promise.resolve()).catch(() => Promise.resolve());
  }
};
