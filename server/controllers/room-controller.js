const express = require('express');
const router = express.Router();
const {authorization} = require("../authorization/auth");
const {getPublicKey} = require("../authorization/keys/keys");
const authMiddleware = authorization(getPublicKey(), {expiresIn: "1h", algorithm: ["RS256"]});
const omit = require("lodash/omit");


module.exports = (db, dbManager) => {
  const roomManager = dbManager("room");

  router.get("/school/org-location/:orgLocationID", authMiddleware, (req, res, next) => {
    roomManager.getRoomByOrgLocationID(req.params.orgLocationID).then(rooms => {
      res.status(200).json(rooms);
    }).catch(err => next(err))
  });


  return router;
};
