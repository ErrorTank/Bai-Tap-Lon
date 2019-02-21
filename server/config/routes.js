const express = require('express');
const router = express.Router();
const createDbManager = require("../db/db-manager");

module.exports = (db) => {
  const dbManager = createDbManager(db);
  router.use('/api', require("../controllers/auth-controller")(db, dbManager));
  router.use('/api', require("../controllers/user-controller")(db, dbManager));
  router.use('/api', require("../controllers/account-controller")(db, dbManager));
  router.use('/api', require("../controllers/school-controller")(db, dbManager));
  router.use('/api', require("../controllers/candidate-controller")(db, dbManager));
  router.use('/api', require("../controllers/sp-controller")(db, dbManager));
  router.use('/api', require("../controllers/prize-controller")(db, dbManager));
  router.use('/api', require("../controllers/supervisor-controller")(db, dbManager));
  router.use('/api', require("../controllers/org-location-controller")(db, dbManager));
  router.use('/api', require("../controllers/subject-controller")(db, dbManager));
  return router;
};
