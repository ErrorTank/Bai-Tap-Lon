const express = require('express');
const router = express.Router();
const {authorization} = require("../authorization/auth");
const {getPublicKey} = require("../authorization/keys/keys");
const authMiddleware = authorization(getPublicKey(), {expiresIn: "1h", algorithm: ["RS256"]});
const omit = require("lodash/omit");





module.exports = (db, dbManager) => {
  const spManager = dbManager("sp");
  router.get("/sp/brief", authMiddleware, (req,res, next) =>{

    console.log({...req.query});
    spManager.getSpBriefWithCondition({...req.query}).then((data) => {
      res.status(200).json(data);
    }).catch(err => next(err));

  });
  router.delete("/sp/:spID", authMiddleware, (req,res, next) =>{
    spManager.deleteSp(req.params.spID).then(() => {
      res.status(200).end();
    }).catch(err => next(err))
  });
  router.put("/sp/:spID", authMiddleware, (req,res, next) =>{
    spManager.updateSp(req.params.spID, req.body.sp).then(() => {
      res.status(200).end();
    }).catch(err => next(err))
  });
  router.get("/sp/:spID", authMiddleware, (req,res, next) =>{
    spManager.getSp(req.params.spID).then(sp => {
      res.status(200).json(sp);
    }).catch(err => next(err))
  });
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
