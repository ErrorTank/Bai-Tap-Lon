require('dotenv').config({path: '.env'});

const app = require("./config/express");
const routerConfig = require('./config/routes');
const initializeDb = require("./config/db");

initializeDb().then((db) => {
  app.use('/', routerConfig(db));
  app.use(require('./utils/error/error-handlers'));
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}` );
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
  process.exit();
});




