import {authenCache} from "../common/cache/authen-cache";


export const authenLoader = {

  async init() {
    await authenCache.loadAuthen();
    return;
  }
};
