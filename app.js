const express = require("express");
const app = express();
// app.use(bodyParser.json()) basically tells the system that you want json to be used.

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
//The extended option allows to choose between parsing the URL-encoded data
app.use(express.json()); // as data from server is json
//express.json() is a built in middleware function in Express
//. It parses incoming JSON requests and puts the parsed data in req.body.
require("dotenv").config();
require("./dataBase/dbConnection");
const personFunctions = require("./routes/person.routes.js");
const userFunctions = require("./routes/user.routes.js");
const adminFunctions = require("./routes/admin.routes.js");
const doctorFunctions = require("./routes/doctor.routes.js");
////////////////////////////////////////////////////
const http = require("http");
const path = require("path");
const fs = require("fs");

//////////////////////////////////////////////////////////

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use("/person", personFunctions);
app.use("/user", userFunctions);
app.use("/admin", adminFunctions);
app.use("/doctor", doctorFunctions);
app.get("/", (req, res) => {
  res.json("nada");
});
app.all("*", (req, res, next) => {
  //all==use : all لازم الباث يكون بالظبط
  // res.status(404).json({ message: "error , can't access this url " + req.originalUrl });
  // new Error("error , can't access this url " + req.originalUrl); //js glabal object
  next(new Error("error , can't access this url " + req.originalUrl));
});
app.use((err, req, res, next) => {
  res.status(500).json({ err: err.message });
});
app.listen(4000);

//status code : language between frontend and backend
//100
//200
//when i insert anything in db it must be 201:created response
//300
//400:client error code
