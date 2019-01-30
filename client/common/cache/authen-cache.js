import {userInfo} from "../states/user-info";
import {authenApi} from "../../api/api";
import {Cache} from "./cache"
import {authenticationApi} from "../../api/common/authen-api";
import Cookies from "js-cookie";

const cookiesEngine = {
  getItem: Cookies.get,
  setItem: Cookies.set,
  removeItem: Cookies.remove
};

export const authenCache = (() =>  {
  const cache = new Cache(cookiesEngine);
  return {
    clearAuthen(){
      cache.setItem(null, "k-authen");
    },
    async loadAuthen(){
      let authen = cache.get("k-authen");
      if(!authen){
        return false;
      }else{
        let info = await authenticationApi.getInfo();
        return userInfo.setState(info);
      }
    },
    getAuthen(){
      return cache.get("k-authen")
    }
  }
})();
