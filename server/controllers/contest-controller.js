const express = require('express');
const router = express.Router();
const {authorization, createAuthToken} = require("../authorization/auth");
const omit = require("lodash/omit");
const {getPublicKey, getPrivateKey} = require("../authorization/keys/keys");
const upload = require("../config/storage/img-storage");

const authMiddleware = authorization(getPublicKey(), {expiresIn: "1 day", algorithm: ["RS256"]});

module.exports = (db, dbManager) => {
  let contestManager = dbManager("contest");
  router.post("/contest/check", authMiddleware, (req, res, next) => {
    contestManager.checkContestExisted(req.body.contest).then(() => {
      res.status(200).end();
    }).catch(err => next(err))
  });
  router.get("/contests/brief-no-con", authMiddleware, (req, res, next) => {
    contestManager.getContestsBrief().then(contests => {
      res.status(200).json(contests);
    }).catch(err => next(err))
  });
  router.get("/contest/brief", authMiddleware, (req,res, next) =>{

    contestManager.getContestBriefWithCondition({...req.query}).then((data) => {
      res.status(200).json(data);
    }).catch(err => next(err));

  });
  router.get("/contest/:contestID", authMiddleware, (req, res, next) => {

    contestManager.getContest(req.params.contestID).then((data) => {
      res.status(200).json(data);
    }).catch(err => next(err));

  });
  router.delete("/contest/:contestID", authMiddleware, (req, res, next) => {

    contestManager.deleteContest(req.params.contestID).then(() => {
      res.status(200).end();
    }).catch(err => next(err));

  });
  router.put("/contest/:contestID",  authMiddleware, (req,res, next) => {



    contestManager.updateContest(req.params.contestID, req.body.contest).then(() => {
      res.status(200).end();
    }).catch(err => next(err));
  });
  router.post("/contest/create",  authMiddleware,  (req,res, next) => {


    contestManager.createContest(req.body.contest).then((contestID) => {
      res.status(200).json({contestID});
    }).catch(err => next(err));
  });


  return router;
};
