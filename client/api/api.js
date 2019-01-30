import {apiFactory} from "./api-factory/api-config";
import {authenCache} from "../common/cache/authen-cache";
import {userInfo} from "../common/states/user-info";


const authenApiConfig = {
  hostURL: "http://localhost:10000",

};

const offlineApiConfig = {
  hostURL: "http://localhost:10000"
};


export const authenApi = apiFactory.createApi(authenApiConfig);

export const offlineApi = apiFactory.createApi(offlineApiConfig);

