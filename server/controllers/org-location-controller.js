const express = require('express');
const router = express.Router();
const {authorization, createAuthToken} = require("../authorization/auth");
const omit = require("lodash/omit");
const {getPublicKey, getPrivateKey} = require("../authorization/keys/keys");
const upload = require("../config/storage/img-storage");

const authMiddleware = authorization(getPublicKey(), {expiresIn: "1 day", algorithm: ["RS256"]});

module.exports = (db, dbManager) => {
  let orgLocationManager = dbManager("orgLocation");

  router.get("/org-location/brief", authMiddleware, (req,res, next) =>{

    orgLocationManager.getOrgLocationBriefWithCondition({...req.query}).then((data) => {
      res.status(200).json(data);
    }).catch(err => next(err));

  });
  router.get("/org-locations/brief-no-con", authMiddleware, (req, res, next) => {
    orgLocationManager.getOrgLocationsBrief().then(orgLocations => {
      res.status(200).json(orgLocations);
    }).catch(err => next(err))
  });

  router.get("/org-location/:orgLocationID", authMiddleware, (req, res, next) => {

    orgLocationManager.getOrgLocation(req.params.orgLocationID).then((data) => {
      res.status(200).json(data);
    }).catch(err => next(err));

  });

  router.post("/org-location/create", authMiddleware, (req,res, next) =>{
    orgLocationManager.createOrgLocation(req.body.orgLocation).then((orgLocationID) => {

      res.status(200).json({orgLocationID});
    }).catch(err => next(err))

  });
  router.put("/org-location/:orgLocationID",  authMiddleware, (req,res, next) => {
    console.log(req.params.orgLocationID);
    console.log(req.body.orgLocation)
    orgLocationManager.updateOrgLocation(req.params.orgLocationID, req.body.orgLocation).then(() => {
      res.status(200).end();
    }).catch(err => next(err));
  });
  router.delete("/org-location/:orgLocationID", authMiddleware, (req, res, next) => {

    orgLocationManager.deleteOrgLocation(req.params.orgLocationID).then(() => {
      res.status(200).end();
    }).catch(err => next(err));

  });


  return router;
};
