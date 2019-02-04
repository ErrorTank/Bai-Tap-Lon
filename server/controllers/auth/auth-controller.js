const express = require('express');
const router = express.Router();
const {authorization, createAuthToken} = require("../../authorization/auth");
const accountSql = require("../../db/acount-sql");
const omit = require("lodash/omit");
const {getPublicKey, getPrivateKey} = require("../../authorization/keys/keys");

const authMiddleware = authorization(getPublicKey(), {expiresIn: "3s", algorithm: ["RS256"]});

module.exports = (db) => {
  let accManager = accountSql(db);
  router.get("/auth", authMiddleware, (req, res) => {
    res.status(200).json(omit(req.user, ['exp', 'iat']));
  });
  router.post("/login", (req, res, next) => {
    accManager.checkLogin(req.body).then((data) => {
      let info = omit(data, ["password"]);
      createAuthToken(info, getPrivateKey(), {expiresIn: "3s", algorithm: "RS256"}).then(token => {
        res.status(200).json({token, info});
      }).catch(err => next(err));

    }).catch(err =>{
      next(err);
    });

  });
  return router;
};
