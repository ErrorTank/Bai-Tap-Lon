const uniquid = require("uniquid");
const sendEmail = require("../../config/email");
const {forgotPasswordTemplate} = require("./email-template");

const createUsersString = (users = '') => {
  if(typeof users === 'string')
    return users;
  let userStr = users.reduce((str, cur) => {
    return str  + cur + ", "
  }, '');
  return userStr.slice(0, userStr.length - 2);
};

const forgotPasswordEmail = ({user}) => {
  let code = uniquid();
  let sendCode = code.slice(-6,-1)+code.slice(-1);
  return new Promise((resolve, reject) => {
    let config = {
      from: 'kappatank98@gmail.com',
      to: createUsersString(user.email),
      subject: 'Xác nhận đổi mật khẩu | Hệ thống quản lý kì thi Olympic',
      html: forgotPasswordTemplate(user, sendCode)
    };
    sendEmail(config).then(() => {
      resolve({
        email: user.email,
        sendCode,

      });
    }).catch(err => reject(err))
  })
};

module.exports = forgotPasswordEmail;