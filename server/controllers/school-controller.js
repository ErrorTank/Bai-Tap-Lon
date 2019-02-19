const express = require('express');
const router = express.Router();
const {authorization} = require("../authorization/auth");
const {getPublicKey} = require("../authorization/keys/keys");
const authMiddleware = authorization(getPublicKey(), {expiresIn: "1h", algorithm: ["RS256"]});
const omit = require("lodash/omit");


module.exports = (db, dbManager) => {
  const schoolManager = dbManager("school");
  router.post("/school/check", authMiddleware, (req, res, next) => {
    schoolManager.checkSchoolExisted(req.body.school).then(() => {
      res.status(200).end();
    }).catch(err => next(err))
  });

  router.get("/schools/brief", authMiddleware, (req, res, next) => {
    console.log({...req.query})
    schoolManager.getSchoolBriefWithCondition({...req.query}).then((data) => {
      res.status(200).json(data);
    }).catch(err => next(err));

  });
  router.delete("/school/:schoolID", authMiddleware, (req,res, next) =>{
    schoolManager.deleteSchool(req.params.schoolID).then(() => {
      res.status(200).end();
    }).catch(err => next(err))
  });
  router.put("/school/:schoolID", authMiddleware, (req,res, next) =>{
    schoolManager.updateSchool(req.params.schoolID, req.body.school).then(() => {
      res.status(200).end();
    }).catch(err => next(err))
  });
  router.post("/school/create", authMiddleware, (req, res, next) => {

    schoolManager.createSchool(req.body.school).then(school => {
      res.status(200).json(school);
    }).catch(err => next(err))
  });
  router.get("/schools/brief-no-con", authMiddleware, (req, res, next) => {
    schoolManager.getSchoolsBrief().then(schools => {
      res.status(200).json(schools);
    }).catch(err => next(err))
  });
  router.get("/school/:schoolID", authMiddleware, (req, res, next) => {
    schoolManager.getSchool(req.params.schoolID).then(school => {
      res.status(200).json(school);
    }).catch(err => next(err))
  });
  router.get("/school/:sID/check-candidate/:cID", authMiddleware, (req, res, next) => {
    let {sID, cID} = req.params;
    console.log(sID, cID);
    schoolManager.checkCandidate(sID, cID).then(() => {
      res.status(200).end();
    }).catch(err => next(err))
  });

  return router;
};
