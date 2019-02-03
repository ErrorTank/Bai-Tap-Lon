import {userInfo} from "../states/user-info";
import {Cache} from "./cache"

import Cookies from "js-cookie";
import {authenticationApi} from "../../api/common/authen-api";


const cookiesEngine = {
  getItem: Cookies.get,
  setItem: Cookies.set,
  removeItem: Cookies.remove
};

export const authenCache = (() =>  {
  const cache = new Cache(cookiesEngine);
  return {
    clearAuthen(){
      cache.set(null, "k-authen");
    },
    async loadAuthen(){
      let authen = cache.get("k-authen");
      if(!authen){
        return false;
      }else{
        let info = await authenticationApi.getInfo();
        if(!info)
          return;
        return userInfo.setState(info);
      }
    },
    getAuthen(){
      return cache.get("k-authen")
    },
    setAuthen(authen){
      cache.set(authen, "k-authen");
    }
  }
})();
