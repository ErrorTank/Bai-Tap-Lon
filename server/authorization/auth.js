const jsonwebtoken = require("jsonwebtoken");
const {AuthorizationError} = require("../utils/error/error-types");

const decodeAuth = (req) => {
  console.log(req.headers);

};

const authorization = (config) => {
  const {secret} = config;
  return (req, res, next) => {
    decodeAuth(req, secret)
      .then((user) => {
        if(!user){
          next(new AuthorizationError("require_login"));
        }else{
          next();
        }
      })
  }
};

module.exports = authorization;
