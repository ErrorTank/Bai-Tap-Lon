const fs = require('fs');
const express = require("express");
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({
  limit: '2mb'
}));

app.use("/", express.static(process.cwd() + "/" + process.env.STATIC_DIR));

app.use("*", (req, res, next) => {
  if (req.path.match(/^\/api\//)) {
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


module.exports = app;
