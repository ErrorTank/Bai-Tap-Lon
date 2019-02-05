const express = require('express');
const router = express.Router();
const {authorization, createAuthToken} = require("../../authorization/auth");
const accountSql = require("../../db/acount-sql");
const omit = require("lodash/omit");
const {getPublicKey, getPrivateKey} = require("../../authorization/keys/keys");

const authMiddleware = authorization(getPublicKey(), {expiresIn: "1h", algorithm: ["RS256"]});

module.exports = (db) => {
  let accManager = accountSql(db);
  router.get("/auth", authMiddleware, (req, res) => {
    accManager.getClientUserCache(req.user.accountID).then(info => {
      res.status(200).json(omit(info, 'password'));
    }).catch(err => next(err));

  });
  router.post("/login", (req, res, next) => {
    accManager.checkLogin(req.body).then((data) => {
      let info = omit(data, ["password"]);
      createAuthToken(info, getPrivateKey(), {expiresIn: "1h", algorithm: "RS256"}).then(token => {
        res.status(200).json({token, info});
      }).catch(err => next(err));

    }).catch(err =>{
      next(err);
    });

  });
  router.put("/account/:accountID/change-password", authMiddleware, (req,res, next) =>{
    accManager.getAccount(req.params.accountID).then(account => {
      let newPassword = req.body;
      console.log(newPassword)
      console.log(req.params.accountID)
      if(newPassword !== account.password){
        next(new Error("wrong_password"));
      }else{
        accManager.updateAccount(req.params.accountID, Object.assign({}, account, {password: req.body})).then(() => {
          res.status(200).end();
        }).catch(err => next(err));
      }


    }).catch(err => next(err))
  });
  return router;
};
