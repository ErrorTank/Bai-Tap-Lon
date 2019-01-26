import {userInfo} from "../states/user-info";
import {authenApi} from "../../api/api";
import {authenticationApi} from "../../api/common/authen-api";


export const authenCache = (() =>  {
  const cache = new Cache();
  return {
    clearAuthen(){
      cache.setItem(null, "k-token");
    },
    async loadAuthen(){
      let authen = cache.get("k-token");
      if(!authen){
        return false;
      }else{
        let info = await authenticationApi.getInfo();
        return userInfo.setState(info);
      }
    }
  }
})();
