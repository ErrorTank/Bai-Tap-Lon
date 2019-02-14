import {createStateHolder} from "./state-holder";

export const userInfo = createStateHolder();



export const Roles = [
  {
    label: "Admin",
    value: 0
  }, {
    label: "Ban tổ chức",
    value: 1
  }, {
    label: "Đại diện trường",
    value: 2
  }, {
    label: "Thí sinh",
    value: 3
  },
];

export const rolesHelper = {
  getRole(){
    let info = userInfo.getState();
    return info ? info.role : null;
  }
};
