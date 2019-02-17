const express = require('express');
const router = express.Router();
const {authorization, createAuthToken} = require("../authorization/auth");
const omit = require("lodash/omit");
const {getPublicKey, getPrivateKey} = require("../authorization/keys/keys");
const upload = require("../config/storage/img-storage");

const authMiddleware = authorization(getPublicKey(), {expiresIn: "1 day", algorithm: ["RS256"]});

module.exports = (db, dbManager) => {
  let prizeManager = dbManager("prize");

  router.post("/prize/create",  authMiddleware, upload.array("dir" ,3), (req,res, next) => {
    console.log(req.body)
    console.log(req.files)
  });
  return router;
};
