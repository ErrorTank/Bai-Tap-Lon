const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.use('/api', require("../controllers/auth/auth-controller")(db));
  router.use('/api', require("../controllers/user/user-controller")(db));


  return router;
};
