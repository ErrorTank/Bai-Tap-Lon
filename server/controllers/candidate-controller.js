const express = require('express');
const router = express.Router();
const {authorization} = require("../authorization/auth");
const {getPublicKey} = require("../authorization/keys/keys");
const authMiddleware = authorization(getPublicKey(), {expiresIn: "1h", algorithm: ["RS256"]});
const omit = require("lodash/omit");





module.exports = (db, dbManager) => {
  const candidateManager = dbManager("candidate");

  router.post("/candidate/check", authMiddleware, (req,res, next) =>{
    candidateManager.checkCandidateExisted(req.body.candidate).then(() => {
      res.status(200).end();
    }).catch(err => next(err))
  });
  router.get("/candidate/account/:accountID", authMiddleware, (req,res, next) =>{
    candidateManager.getCandidateByAccountID(req.params.accountID).then(candidate => {
      res.status(200).json(candidate);
    }).catch(err => next(err))
  });
  return router;
};