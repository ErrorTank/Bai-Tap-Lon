import {authenCache} from "../common/cache/authen-cache";
import {userInfo} from "../common/states/user-info";
import {authenApi} from "../api/api";


export const authenLoader = {
  init() {

    authenApi.addHeader("Authorization", () => {
      let {access_token} = userInfo.getState();
      return access_token ? `Bearer ${access_token}` : null;
    });
    userInfo.onChange((authen)=> {
      authenCache.set(authen, "k-authen");
    });

    return authenCache.loadAuthen();
  }
};
