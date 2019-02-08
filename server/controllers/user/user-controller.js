const express = require('express');
const router = express.Router();
const {authorization} = require("../../authorization/auth");
const {getPublicKey} = require("../../authorization/keys/keys");
const authMiddleware = authorization(getPublicKey(), {expiresIn: "1h", algorithm: ["RS256"]});
const omit = require("lodash/omit");
const userSql = require("../../db/user-sql");


module.exports = (db) => {
  const userManager = userSql(db);
  router.get("/user/:userID", authMiddleware, (req,res, next) =>{
    userManager.getUser(req.params.userID).then(user => {
      res.status(200).json(omit(user, "password"));
    }).catch(err => next(err))
  });
  router.put("/user/:userID", authMiddleware, (req,res, next) =>{
    userManager.updateUser(req.params.userID, req.body.user).then(() => {
      res.status(200).end();
    }).catch(err => next(err))
  });
  return router;
};
