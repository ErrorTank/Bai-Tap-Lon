import {apiFactory} from "./api-factory/api-config";
import {authenCache} from "../common/cache/authen-cache";
import {userInfo} from "../common/states/user-info";
import {customHistory} from "../react/routes/routes";


const authenApiConfig = {
  hostURL: "http://localhost:10000/api",
  onErrors: {
    "token_expired": () => {
      authenCache.clearAuthen();
      customHistory.push("/login?error=token_expired")
    }
  }

};

const offlineApiConfig = {
  hostURL: "http://localhost:10000/api"
};


export const authenApi = apiFactory.createApi(authenApiConfig);

export const offlineApi = apiFactory.createApi(offlineApiConfig);

