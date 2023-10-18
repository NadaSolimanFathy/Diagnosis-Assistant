const userModel = require("../dataBase/DBmodels/DBuserModel.js");
const AdminModel = require("../dataBase/DBmodels/AdminModel.js");
const doctorModel = require("../dataBase/DBmodels/DoctorModel.js");
const userQuestions = require("../dataBase/DBmodels/userQuestions.js");

const bcrypt = require("bcrypt");
const generateToken = require("../util/generateToken.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const emaling = require("../controllers/emailController/email.js");

////////////////////////////////////////////////
const http = require("http");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
///////////////////////////////////////////////

module.exports = class Person {
  constructor() {}

  logIn(req, res) {
    const logInFunction = async (req, res) => {
      const { email, password } = req.body;
      let DB_Model;
      let thePerson = await userModel.findOne({ email: email });
      console.log("the person 1 " + thePerson);
      if (thePerson) {
        DB_Model = userModel;
        console.log("hi user ");
        loggingIn(thePerson, "user");
      } else if (thePerson == null) {
        let thePerson = await AdminModel.findOne({ email: email });
        if (thePerson) {
          DB_Model = AdminModel;
          console.log("hi admin ");
          loggingIn(thePerson, "admin");
        } else if (thePerson == null) {
          let thePerson = await doctorModel.findOne({ email: email });
          if (thePerson) {
            DB_Model = doctorModel;
            console.log("hi doctor ");
            loggingIn(thePerson, "doctor");
          } else {
            console.log("person not found");
            res.json("person not found");
          }
        }
      }
      function loggingIn(thePerson, role) {
        console.log("yes person found!");
        if (thePerson.confirmedEmail) {
          console.log("confirmed Email true");
          const match = bcrypt.compareSync(password, thePerson.password);
          //compare hash the given password in it
          if (match) {
            console.log(" logged in  !");
            //create token=>payload ,secret key
            let token = generateToken({
              //GENERATETOKEN
              name: thePerson.userName,
              role: role,
              userId: thePerson._id,
            });
            res.json({ token: token });
          } else {
            res.json("password not match");
          }
        } else {
          res.json("sorry you must verify your email first");
          console.log("sorry you must verify your email first");
        }
      }
    };
    asyncHandler(logInFunction(req, res));
  }
  async showUserQuestions(req, res) {
    //user to  ask and doctor to answer
    console.log("hi questions");
    let questions = await userQuestions
      .find()
      .select("-_id -createdAt -updatedAt -answeredBy -askedBy");
    res.json(questions);
  }
  async changeProfileImage(req, res) {
    console.log("hi my new image");
    const upload = multer({
      dest: "../profilePictures",
      // you might also want to set some limits: https://github.com/expressjs/multer#limits
    });

    upload.single("file" /* name attribute of <file> element in your form */),
      (req, res) => {
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "./uploads/image.png");

        if (path.extname(req.file.originalname).toLowerCase() === ".png") {
          fs.rename(tempPath, targetPath, (err) => {
            if (err) return handleError(err, res);

            res.status(200).contentType("text/plain").end("File uploaded!");
          });
        } else {
          fs.unlink(tempPath, (err) => {
            if (err) return handleError(err, res);

            res
              .status(403)
              .contentType("text/plain")
              .end("Only .png files are allowed!");
          });
        }
      };
  }
};
