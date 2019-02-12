const express = require('express');
const router = express.Router();
const {authorization} = require("../authorization/auth");
const {getPublicKey} = require("../authorization/keys/keys");
const authMiddleware = authorization(getPublicKey(), {expiresIn: "1h", algorithm: ["RS256"]});
const omit = require("lodash/omit");





module.exports = (db, dbManager) => {
  const spManager = dbManager("sp");

  router.post("/sp/check", authMiddleware, (req,res, next) =>{
    spManager.checkSpExisted(req.body.sp).then(() => {
      res.status(200).end();
    }).catch(err => next(err))
  });
  router.get("/sp/account/:accountID", authMiddleware, (req,res, next) =>{
    spManager.getSpByAccountID(req.params.accountID).then(sp => {
      res.status(200).json(sp);
    }).catch(err => next(err))
  });
  return router;
};
