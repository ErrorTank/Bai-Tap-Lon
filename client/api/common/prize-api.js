import {authenApi} from "../api";

export const prizeApi = {
  createPrize(prize){
    return authenApi.postMultipart(`/prize/create`, prize)
  }
};

