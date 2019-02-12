const express = require('express');
const router = express.Router();
const {authorization} = require("../authorization/auth");
const {getPublicKey} = require("../authorization/keys/keys");
const authMiddleware = authorization(getPublicKey(), {expiresIn: "1h", algorithm: ["RS256"]});
const omit = require("lodash/omit");



module.exports = (db, dbManager) => {
  const accountManager = dbManager("account");
  const userManager = dbManager("user");
  const candidateManager = dbManager("candidate");
  const spManager = dbManager("sp");
  router.get("/account/:accountID/role/:role/check-in-user", authMiddleware, (req,res, next) =>{

    let {role, accountID} = req.params;
    let getAccountInfo = () => {
      accountManager.getAccount(accountID).then(account => {
        res.status(200).json(account);
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
  router.put("/account/:accountID", authMiddleware, (req,res, next) =>{
    accountManager.updateAccount(req.params.accountID, req.body.account).then(() => {
      res.status(200).end();
    }).catch(err => next(err))
  });
  router.post("/account/check", authMiddleware, (req,res, next) =>{
    accountManager.checkAccountExisted(req.body.account).then(() => {
      res.status(200).end();
    }).catch(err => next(err))
  });
  router.post("/account/create", authMiddleware, (req,res, next) =>{

    let {account, info} = req.body;
    let matcher = {
      0: (accountID) => userManager.createUser({...info, accountID}),
      1: (accountID) => userManager.createUser({...info, accountID}),
      2: (accountID) => spManager.createSp({...info, accountID}),
      3: (accountID) => candidateManager.createCandidate({...info, accountID}),

    };
    accountManager.createAccount({...account}).then((accountID) => {

      matcher[account.role](accountID).then(() => {
        res.status(200).json({accountID});
      }).catch(err => next(err));

    }).catch(err => next(err))
  });
  return router;
};
