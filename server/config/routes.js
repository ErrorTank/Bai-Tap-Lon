const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.use('/api', require("../controllers/auth-controller")(db));
  router.use('/api', require("../controllers/user-controller")(db));
  router.use('/api', require("../controllers/account-controller")(db));
  router.use('/api', require("../controllers/school-controller")(db));
  return router;
};
