const express = require('express');
const router = express.Router();
const {authorization} = require("../../authorization/auth");
const {getPublicKey} = require("../../authorization/keys/keys");
const authMiddleware = authorization(getPublicKey(), {expiresIn: "1h", algorithm: ["RS256"]});
const omit = require("lodash/omit");
const accountSql = require("../../db/acount-sql");
const userSql = require("../../db/user-sql");


module.exports = (db) => {
  const accountManager = accountSql(db);
  const userManager = userSql(db);
  router.get("/account/:accountID/role/:role/check-in-user", authMiddleware, (req,res, next) =>{

    let {role, accountID} = req.params;
    let getAccountInfo = () => {
      accountManager.getAccount(accountID).then(account => {
        res.status(200).json(omit(account, "password"));
      }).catch(err => next(err))
    };
    if(Number(role) === 1){
      userManager.getUserByAccountID(accountID).then((result) => {
        next(new Error("Manager cannot see user account info!"))
      }).catch(err => {
        if(err.message === "not_found"){
          getAccountInfo();
        }
      });
    }else{
      getAccountInfo();
    }

  });
  return router;
};
