const uniquid = require("uniquid");

const createUsersString = (users = '') => {
  if(typeof users === 'string')
    return users;
  let userStr = users.reduce((str, cur) => {
    return str  + cur + ", "
  }, '');
  return userStr.slice(0, userStr.length - 2);
};

const forgotPasswordEmail = ({users}) => {
  let code = uniquid()
};