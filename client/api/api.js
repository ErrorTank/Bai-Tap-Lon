
import {apiFactory} from "./api-factory/api-config";
import {authenCache} from "../common/cache/authen-cache";



const authenApiConfig = {
  hostURL: "http://localhost:10000",
  headers: [
    {key: "Authorization", content: () => authenCache.getAuthen()}
  ]
};

const offlineApiConfig = {
  hostURL: "http://localhost:10000",
  headers: []
};



export const authenApi = apiFactory.createApi(authenApiConfig);

export const offlineApi = apiFactory.createApi(offlineApiConfig);

