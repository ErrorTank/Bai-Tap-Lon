require('dotenv').config({path: '.env'});
import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const server = require('http').createServer(app);


app.use(express.static(path.resolve(__dirname, "../dev")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get("*", (req, res ,next) => {
  if (req.path.match(/^\/api\//)) {
    next();
  } else {
    res.sendFile(path.resolve(__dirname, "../public/index.html"));
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Server running at: ${process.env.PORT}` );
});

