const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.use('/api', require("../controllers/auth/auth-api")(db));
  router.use('/api', require("../controllers/user/user-api")(db));


  return router;
};
