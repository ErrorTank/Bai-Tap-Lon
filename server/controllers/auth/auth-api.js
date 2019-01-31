const express = require('express');
const router = express.Router();
const  authorization = require("../../authorization/auth");

module.exports = (db) => {
  router.get("/auth", authorization, (req, res) => {
    res.status(200).end();
  });
  return router;
};
