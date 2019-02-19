const express = require('express');
const router = express.Router();
const {authorization, createAuthToken} = require("../authorization/auth");
const omit = require("lodash/omit");
const {getPublicKey, getPrivateKey} = require("../authorization/keys/keys");
const upload = require("../config/storage/img-storage");

const authMiddleware = authorization(getPublicKey(), {expiresIn: "1 day", algorithm: ["RS256"]});

module.exports = (db, dbManager) => {
  let supervisorManager = dbManager("supervisor");
  router.post("/supervisor/check", authMiddleware, (req, res, next) => {
    supervisorManager.checkSupervisorExisted(req.body.supervisor).then(() => {
      res.status(200).end();
    }).catch(err => next(err))
  });
  router.get("/supervisor/brief", authMiddleware, (req,res, next) =>{

    supervisorManager.getSupervisorBriefWithCondition({...req.query}).then((data) => {
      res.status(200).json(data);
    }).catch(err => next(err));

  });
  router.get("/supervisor/:supervisorID", authMiddleware, (req, res, next) => {

    supervisorManager.getSupervisor(req.params.supervisorID).then((data) => {
      res.status(200).json(data);
    }).catch(err => next(err));

  });
  router.delete("/supervisor/:supervisorID", authMiddleware, (req, res, next) => {

    supervisorManager.deleteSupervisor(req.params.supervisorID).then(() => {
      res.status(200).end();
    }).catch(err => next(err));

  });
  router.put("/supervisor/:supervisorID",  authMiddleware, (req,res, next) => {



    supervisorManager.updateSupervisor(req.params.supervisorID, req.body.supervisor).then(() => {
      res.status(200).end();
    }).catch(err => next(err));
  });
  router.post("/supervisor/create",  authMiddleware,  (req,res, next) => {


    supervisorManager.createSupervisor(req.body.supervisor).then((supervisorID) => {
      res.status(200).json({supervisorID});
    }).catch(err => next(err));
  });


  return router;
};
