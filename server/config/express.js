const fs = require('fs');
const express = require("express");
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({
  limit: '2mb'
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/", express.static(process.cwd() + "/" + process.env.STATIC_DIR));

app.use("*", (req, res, next) => {
  if (/^\/api\//.test(req.originalUrl)) {
    next();
  } else {
    res.sendFile(process.cwd() + "/" + process.env.HTML_DIR);
  }
});

let uploadDir = process.cwd() + "/" + process.env.UPLOAD_DIR;


if (!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir);
}

if (!fs.existsSync(uploadDir + "/img")){
  fs.mkdirSync(uploadDir + "/img");
}
app.use("/uploads", express.static(uploadDir));

module.exports = app;
