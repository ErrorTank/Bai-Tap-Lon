import {authenApi} from "../api";

export const prizeApi = {
  createPrize(prize){
    return authenApi.create(`/prize/create`, {prize})
  }
};

