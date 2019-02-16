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
    loadAuthen(){
      return new Promise((resolve, reject) => {
        let authen = cache.get("k-authen");
        if(!authen){
          reject();
        }else{
          authenticationApi.getInfo().then(info => {
            if(!info)
              reject();
            else
              resolve(userInfo.setState(info));
          }).catch(err => reject());

        }
      });

    },
    getAuthen(){
      return cache.get("k-authen")
    },
    setAuthen(authen, options){
      cache.set(authen, "k-authen", options);
    }
  }
})();
