
import {apiFactory} from "./api-factory/api-config";



const authenApiConfig = {
  hostURL: "http://localhost:10000",
  headers: [
    {key: "Authorization", content: ""}
  ]
};

const offlineApiConfig = {
  hostURL: "http://localhost:10000",
  headers: []

};



export const authenApi = apiFactory.createApi(authenApiConfig);

export const offlineApi = apiFactory.createApi(offlineApiConfig);

