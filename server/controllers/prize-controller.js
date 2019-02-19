const express = require('express');
const router = express.Router();
const {authorization, createAuthToken} = require("../authorization/auth");
const omit = require("lodash/omit");
const {getPublicKey, getPrivateKey} = require("../authorization/keys/keys");
const upload = require("../config/storage/img-storage");

const authMiddleware = authorization(getPublicKey(), {expiresIn: "1 day", algorithm: ["RS256"]});

module.exports = (db, dbManager) => {
  let prizeManager = dbManager("prize");
  router.get("/prize/brief", authMiddleware, (req,res, next) =>{

    prizeManager.getPrizeBriefWithCondition({...req.query}).then((data) => {
      res.status(200).json(data);
    }).catch(err => next(err));

  });
  router.get("/prize/:prizeID", authMiddleware, (req, res, next) => {

    prizeManager.getPrize(req.params.prizeID).then((data) => {
      res.status(200).json(data);
    }).catch(err => next(err));

  });
  router.delete("/prize/:prizeID", authMiddleware, (req, res, next) => {

    prizeManager.deletePrize(req.params.prizeID).then((data) => {
      res.status(200).end();
    }).catch(err => next(err));

  });
  router.post("/prize/update",  authMiddleware, upload.array("created" ,3), (req,res, next) => {
    let data = req.body;
    let files = req.files;
    console.log(data)
    console.log(files)

    prizeManager.updatePrize({data: {...data}, files:[...files]}).then((data) => {
      res.status(200).json(data);
    }).catch(err => next(err));
  });
  router.post("/prize/create",  authMiddleware, upload.array("dir" ,3), (req,res, next) => {
    let data = req.body;
    let files = req.files;

    prizeManager.createPrize({data: {...data}, files:[...files]}).then((prizeID) => {
      res.status(200).json({prizeID});
    }).catch(err => next(err));
  });


  return router;
};
