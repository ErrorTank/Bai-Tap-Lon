import {authenApi} from "../api";

export const prizeApi = {
  createPrize(prize, keyPath){
    return authenApi.postMultipart(`/prize/create`, prize, keyPath)
  },
  get(prizeID){
    return authenApi.get("/prize/" + prizeID);
  },
  deletePrize(prizeID){
    return authenApi.delete("/prize/" + prizeID)
  },
  update(prize, key){
    console.log(prize)
    return authenApi.postMultipart("/prize/update", prize ,key)
  }
};

