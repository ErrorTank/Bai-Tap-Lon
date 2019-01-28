import {authenCache} from "../common/cache/authen-cache";


export const authenLoader = {
  init() {
    return new Promise((res, rej) => {
      setTimeout(() => res(), 0);
      // authenCache.loadAuthen().then((status) => res());
    });
  }
};
