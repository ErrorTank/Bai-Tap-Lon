
import {authenApi} from "../api";
import {urlUtils} from "../../common/url-utils";

export const roomApi = {
  getRoomByOrgLocationID(orgLocationID) {
    return authenApi.get("/room/org-location/" + orgLocationID);
  },
};
