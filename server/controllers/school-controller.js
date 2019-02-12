const express = require('express');
const router = express.Router();
const {authorization} = require("../authorization/auth");
const {getPublicKey} = require("../authorization/keys/keys");
const authMiddleware = authorization(getPublicKey(), {expiresIn: "1h", algorithm: ["RS256"]});
const omit = require("lodash/omit");
const schoolSql = require("../db/school-sql");




module.exports = (db) => {
  const schoolManager = schoolSql(db);

  router.get("/schools/brief", authMiddleware, (req,res, next) =>{
    schoolManager.getSchoolsBrief().then(schools => {
      res.status(200).json(schools);
    }).catch(err => next(err))
  });

  return router;
};
