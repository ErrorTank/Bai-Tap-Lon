const express = require('express');
const router = express.Router();
const {authorization, createAuthToken} = require("../authorization/auth");
const omit = require("lodash/omit");
const {getPublicKey, getPrivateKey} = require("../authorization/keys/keys");

const authMiddleware = authorization(getPublicKey(), {expiresIn: "1 day", algorithm: ["RS256"]});

module.exports = (db, dbManager) => {
  let accManager = dbManager("account");
  router.get("/auth", authMiddleware, (req, res, next) => {
    accManager.getClientUserCache(req.user).then(info => {
      res.status(200).json(omit(info, 'password'));
    }).catch(err => next(err));

  });
  router.post("/login", (req, res, next) => {
    accManager.checkLogin(req.body).then((data) => {
      let info = omit(data, ["password"]);
      createAuthToken(info, getPrivateKey(), {expiresIn: "1 day", algorithm: "RS256"}).then(token => {
        res.status(200).json({token, info});
      }).catch(err => next(err));

    }).catch(err =>{
      next(err);
    });

  });
  router.put("/account/:accountID/change-password", authMiddleware, (req,res, next) => {
    accManager.getAccount(req.params.accountID).then(account => {
      let oldPassword = req.body.oldPassword;
      if(oldPassword !== account.password){
        next(new Error("wrong_password"));
      }else{
        accManager.updateAccount(req.params.accountID, Object.assign({}, account, {password: req.body.password})).then(() => {
          res.status(200).end();
        }).catch(err => next(err));
      }


    }).catch(err => next(err))
  });
  return router;
};
