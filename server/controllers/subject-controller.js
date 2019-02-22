const express = require('express');
const router = express.Router();
const {authorization, createAuthToken} = require("../authorization/auth");
const omit = require("lodash/omit");
const {getPublicKey, getPrivateKey} = require("../authorization/keys/keys");
const upload = require("../config/storage/img-storage");

const authMiddleware = authorization(getPublicKey(), {expiresIn: "1 day", algorithm: ["RS256"]});

module.exports = (db, dbManager) => {
  let subjectManager = dbManager("subject");

  router.get("/subject/brief", authMiddleware, (req,res, next) =>{

    subjectManager.getSubjectBriefWithCondition({...req.query}).then((data) => {
      res.status(200).json(data);
    }).catch(err => next(err));

  });
  router.get("/subjects/brief-no-con", authMiddleware, (req, res, next) => {
    subjectManager.getSubjectsBrief().then(subjects => {
      res.status(200).json(subjects);
    }).catch(err => next(err))
  });
  router.get("/subject/:subjectID", authMiddleware, (req, res, next) => {

    subjectManager.getSubject(req.params.subjectID).then((data) => {
      res.status(200).json(data);
    }).catch(err => next(err));

  });
  router.delete("/subject/:subjectID", authMiddleware, (req, res, next) => {

    subjectManager.deleteSubject(req.params.subjectID).then(() => {
      res.status(200).end();
    }).catch(err => next(err));

  });
  router.put("/subject/:subjectID",  authMiddleware, (req,res, next) => {



    subjectManager.updateSubject(req.params.subjectID, req.body.subject).then(() => {
      res.status(200).end();
    }).catch(err => next(err));
  });
  router.post("/subject/create",  authMiddleware,  (req,res, next) => {


    subjectManager.createSubject(req.body.subject).then((subjectID) => {
      res.status(200).json({subjectID});
    }).catch(err => next(err));
  });


  return router;
};
