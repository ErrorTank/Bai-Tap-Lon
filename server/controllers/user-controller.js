const express = require('express');
const router = express.Router();
const {authorization} = require("../authorization/auth");
const {getPublicKey} = require("../authorization/keys/keys");
const authMiddleware = authorization(getPublicKey(), {expiresIn: "1h", algorithm: ["RS256"]});
const omit = require("lodash/omit");





module.exports = (db, dbManager) => {
  const userManager = dbManager("user");

  router.get("/user/:userID", authMiddleware, (req,res, next) =>{
    userManager.getUser(req.params.userID).then(user => {
      res.status(200).json(omit(user, "password"));
    }).catch(err => next(err))
  });
  router.get("/user/account/:accountID", authMiddleware, (req,res, next) =>{
    userManager.getUserByAccountID(req.params.accountID).then(user => {
      res.status(200).json(user);
    }).catch(err => next(err))
  });
  router.put("/user/:userID", authMiddleware, (req,res, next) =>{
    userManager.updateUser(req.params.userID, req.body.user).then(() => {
      res.status(200).end();
    }).catch(err => next(err))
  });
  router.post("/user/check", authMiddleware, (req,res, next) =>{
    userManager.checkUserExisted(req.body.user).then(() => {
      res.status(200).end();
    }).catch(err => next(err))
  });
  return router;
};
