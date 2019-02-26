const express = require('express');
const router = express.Router();
const {authorization, createAuthToken} = require("../authorization/auth");
const omit = require("lodash/omit");
const {getPublicKey, getPrivateKey} = require("../authorization/keys/keys");
const upload = require("../config/storage/img-storage");

const authMiddleware = authorization(getPublicKey(), {expiresIn: "1 day", algorithm: ["RS256"]});

module.exports = (db, dbManager) => {
  let resultManager = dbManager("result");
  router.get("/results/brief-no-con", authMiddleware, (req, res, next) => {
    resultManager.getResultsBrief().then(data => {
      res.status(200).json(data);
    }).catch(err => next(err))
  });
  router.post("/result/check", authMiddleware, (req, res, next) => {
    resultManager.checkResultExisted(req.body.result).then(() => {
      res.status(200).end();
    }).catch(err => next(err))
  });
  router.get("/result/brief", authMiddleware, (req,res, next) =>{

    resultManager.getResultBriefWithCondition({...req.query}).then((data) => {
      res.status(200).json(data);
    }).catch(err => next(err));

  });
  router.get("/result/:resultID", authMiddleware, (req, res, next) => {

    resultManager.getResult(req.params.resultID).then((data) => {
      res.status(200).json(data);
    }).catch(err => next(err));

  });
  router.delete("/result/:resultID", authMiddleware, (req, res, next) => {

    resultManager.deleteResult(req.params.resultID).then(() => {
      res.status(200).end();
    }).catch(err => next(err));

  });
  router.put("/result/:resultID",  authMiddleware, (req,res, next) => {



    resultManager.updateResult(req.params.resultID, req.body.result).then(() => {
      res.status(200).end();
    }).catch(err => next(err));
  });
  router.post("/result/create",  authMiddleware,  (req,res, next) => {


    resultManager.createResult(req.body.result).then((rID) => {
      res.status(200).json({rID});
    }).catch(err => next(err));
  });


  return router;
};
