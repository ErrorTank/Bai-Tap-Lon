import {authenCache} from "../common/cache/authen-cache";
import {userInfo} from "../common/states/user-info";
import {authenApi} from "../api/api";

//todo test jwt(expire) test cookie expire
//todo check jwt expire and cookie expire
export const authenLoader = {
  init() {

    authenApi.addHeader("Authorization", () => {
      let {access_token} = authenCache.getAuthen();
      return access_token ? `Bearer ${access_token}` : null;
    });



    return authenCache.loadAuthen();
  }
};
