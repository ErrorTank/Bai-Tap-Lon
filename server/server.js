require('dotenv').config({path: '.env'});

const app = require("./config/express");
const routerConfig = require('./config/routes');
const db = null;

app.use('/', routerConfig(db));
app.use(require('./utils/error-handlers'));
app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}` );
});

