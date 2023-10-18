////////////////////DB Models///////////////////////////////////////////
const userModel = require("../dataBase/DBmodels/DBuserModel");
const userMedicalRecordModel = require("../dataBase/DBmodels/usersMedicalRecords.js");
const feedBackModel = require("../dataBase/DBmodels/feedBackModel");
const userQuestions = require("../dataBase/DBmodels/userQuestions");
const contactUsModel = require("../dataBase/DBmodels/contactUsModel");

/////////////////////////////////////////////////////////////////////
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const emalingFOrVerify = require("../controllers/emailController/email.js");
const emalingForResetPass = require("../controllers/forgotPassController/email.js");
const { nanoid, customAlphabet } = require("nanoid");
// const nanoid = require("nanoid");
// import { customAlphabet } from "nanoid";

////////////////////////////////////////////////////////
const request = require("request"); //for flask server
//////////////////////////////////////////////////////
const Person = require("./OOP_Person.js"); // father
//////////////////////////////////////////////////////
module.exports = class User extends Person {
  constructor() {
    super();
  }

  async signUp(req, res) {
    //rasha
    let { userName, email, password, gender, address } = req.body;

    let user = await userModel.findOne({ email });
    if (user) {
      res.status(409).json({ message: "email already in use" });
    } else {
      // myPlaintextPassword, saltRounds
      bcrypt.hash(password, 8, async function (err, hash) {
        // Store hash in your database
        await userModel.insertMany({
          userName,
          email,
          password: hash,
          gender,
          address,
        });
        emalingFOrVerify({ email, userName });
        console.log(email);
        res.status(200).json({ message: "successSignUp" });
      });
    }
  }
  async verifyEmail(req, res) {
    const userToken = req.params.token;
    jwt.verify(userToken, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.json(err);
      } else {
        console.log(decoded);
        await userModel.findOneAndUpdate(
          { email: decoded.email },
          { confirmedEmail: true }
        );
        res.status(200).json({ message: "confirmation done!" });
      }
    });
  }
  //////////////////CheckUp Main Functions /////////////////////////////
  async enterSymptoms(req, res) {
    console.log("this is main method"); //1
    const { userToken, symptoms } = req.body;

    console.log(`the coming symptoms from front is ${symptoms}`); //2
    // const userToken = req.header("token");
    console.log(userToken); //3
    async function doPOSTRequest(symptoms) {
      var options = {
        method: "POST",
        uri: "http://127.0.0.1:5000/MLflask",
        body: symptoms,
        json: true, // Automatically stringifies the body to JSON
      };
      return new Promise(function (resolve, reject) {
        request(options, function (error, res, body) {
          if (!error && res.statusCode === 200) {
            resolve(body);
          } else {
            reject(error);
          }
        });
      });
    }
    jwt.verify(userToken, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.json(err);
      } else {
        console.log("the token is correct"); //4
        let createdBy = decoded.userId;
        let result = await doPOSTRequest(symptoms);
        console.log(" the disease is : : :" + result);
        //////////////insert records in all records///////////////////////////
        await userMedicalRecordModel.insertMany(
          {
            createdBy,
            symptoms,
            result,
          },
          { ordered: false } //to skipe duplication
        );

        res.status(200).json(result);
      }
    });
  }
  //////////////////////////////////////////////////////
  retreiveMedicalRecords(req, res) {
    const userToken = req.body.token;
    jwt.verify(userToken, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json(err);
        //Return a HTTP status code 401 when the token is not valid.
      } else {
        let idd = decoded.userId;
        console.log(decoded);
        let records = await userMedicalRecordModel
          .find({ createdBy: idd })
          .select({
            _id: 0,
            symptoms: 1,
            result: 1,
          });
        console.log(records);
        // res.status(200).json({ message: "the records : " + records });
        res.status(200).json(records);
      }
    });
  }
  /////////////////Update Profile Info////////////////////////////////////////////
  async updatePassword(req, res) {
    let { id, oldPass, newPass } = req.body;
    console.log("hi password");
    console.log(id);
    //update password
    const thePerson = await userModel.findById(id);
    const match = bcrypt.compareSync(oldPass, thePerson.password);
    //compare hash the given password in it
    if (match) {
      console.log(" logged in  !");
      bcrypt.hash(
        newPass,
        Number(process.env.HASH_ROUND),
        async function (err, hash) {
          newPass = hash;
          await userModel.findByIdAndUpdate(id, { password: newPass });
        }
      );
      res.json({ message: "password changed successfully !" });
    } else {
      //401 Unauthorized is the status code to return when the client provides no credentials or invalid credentials.
      res.json({ message: "oops the password may be wrong !" });
    }
  }
  async updateAddress(req, res) {
    const { id, newAddress } = req.body;
    //update password
    await userModel.findByIdAndUpdate(id, { address: newAddress });
    res.status(200).json({ message: "address changed successfully !" });
  }
  //image change
  ///////////////////////////////////////////////////////////////

  async sendCode(req, res, next) {
    let { email } = req.body;
    let nanoId = customAlphabet("123456789", 5);
    let code = nanoId();
    await userModel
      .findOneAndUpdate({ email }, { forgetCode: code })
      .then((data) => {
        if (!data) {
          // return next(new AppError("Not Register account", 404));
          res.json({ message: "no account", status: 200 });
        } else {
          console.log(data);
          emalingForResetPass({ email, code });
          res.json({ message: "success", status: 200 });
        }
      });
  }

  async restPassword(req, res, next) {
    let { email, code, newPassword } = req.body;

    bcrypt.hash(newPassword, 8, async function (err, hash) {
      // Store hash in your database
      await userModel
        .findOneAndUpdate({ email, forgetCode: code }, { password: hash })
        .then(async (data) => {
          console.log(data);
          if (!data) {
            return next(new AppError("code or email are invalid ", 404));
          }
          await userModel.findOneAndUpdate({ email }, { forgetCode: null });
          res.json("success");
        });
    });
  }
  ///////////////////FeedBack Part ///////////////////////////////////////////
  async sendFeedBack(req, res) {
    const { userToken, comment } = req.body;

    jwt.verify(userToken, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.json(err);
      } else {
        console.log("the token is correct");
        let userName = decoded.name;
        let feedBack = await feedBackModel.insertMany({ userName, comment });
        res.status(200).json(feedBack);
      }
    });
  }
  async showFeedBacks(res) {
    let feedBacks = await feedBackModel
      .find()
      .select("-_id -createdAt -updatedAt");
    res.status(200).json(feedBacks);
  }
  ///////////////////Question Part ///////////////////////////////////////////

  async askQuestion(req, res) {
    const { question, questionNumber, userToken } = req.body;

    jwt.verify(userToken, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.json(err);
      } else {
        console.log("the token is correct");
        let askedBy = decoded.userId;
        let userName = decoded.name;
        let response = await userQuestions.insertMany({
          question,
          questionNumber,
          askedBy: askedBy,
          userName: userName,
        });
        res.json(response);
      }
    });
  }

  /////////////////Contact Us///////////////////////////////////////////
  async contactUs(req, res) {
    const { name, email, message } = req.body;
    let response = await contactUsModel.insertMany({
      name,
      email,
      message,
    });
    res.json(response);
  }
  /////////////////////////////////////////////////
  async deleteUser(req, res) {
    const { email, token } = req.body;
    console.log(`the email is ${email}`);
    console.log("hihi hi from delete method ~");
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.json(err);
      } else {
        console.log("hi hi hi");
        let id = decoded.userId;
        console.log(id);
        let theSelectedUser = await userModel.findById(id).select({ email: 1 });
        console.log(theSelectedUser);
        console.log(email);
        if (theSelectedUser.email == email) {
          let deletedAcc = await userModel.findByIdAndDelete(id);
          res.json("accountDeleted");
        } else {
          console.log("not not not");
          res.json("that's not your email");
        }
      }
    });
  }
};
