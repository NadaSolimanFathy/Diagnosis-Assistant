const userModel = require("../dataBase/DBmodels/DBuserModel");
const AdminModel = require("../dataBase/DBmodels/AdminModel");
const doctorModel = require("../dataBase/DBmodels/DoctorModel");
const contactUsModel = require("../dataBase/DBmodels/contactUsModel");
const usersMedicalRecords = require("../dataBase/DBmodels/usersMedicalRecords");
const Person = require("./OOP_Person.js");
const bcrypt = require("bcrypt");
const generateToken = require("../util/generateToken.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

module.exports = class Admin extends Person {
  constructor() {
    super();
  }

  async addNewAdmin(req, res) {
    let { userName, password, email, address } = req.body;
    let confirmedEmail = false;
    AdminModel.findOne({ email }, (err, item) => {
      if (item) {
        res.json({ message: "sorry its already found" });
      } else {
        bcrypt.hash(
          password,
          Number(process.env.HASH_ROUND),
          async function (err, hash) {
            password = hash;
            await AdminModel.insertMany({
              userName,
              password,
              email,
              address,
              confirmedEmail,
            }).catch((err) => {
              res.json({ message: "error", err });
            });
            res.json({ message: "new admin added, done!" });
          }
        );
      }
    });
  }

  async showAllUsers(req, res) {
    console.log("in the show function");
    // let token = req.body.token;
    const token = req.body.token;

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.json(err);
      } else {
        console.log(`role = ${decoded.role}`);

        await userModel
          .find()
          .select({
            _id: 0,
            userName: 1,
            email: 1,
          }) //gives me all items automatically
          .then((result) => {
            res.json(result); //return response in json format
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
  async deleteUser(req, res) {
    const userEmail = req.body.email;
    console.log(`the email is ${userEmail}`);
    console.log("hihi hi from delete method ~");
    let theSelectedUser = await userModel
      .findOne({ email: userEmail })
      .select({ _id: 1 });
    console.log(theSelectedUser);
    if (theSelectedUser !== null) {
      let id = theSelectedUser._id;

      await userModel.findByIdAndDelete(id); //{ _id: 2 }
      res.json({ message: "deletionDone" });
    } else {
      console.log("not here");
      res.json({ message: "userNotFound" });
    }
  }

  retreiveMedicalRecords(req, res) {
    const adminToken = req.header("token");
    // const adminToken = req.body.token;

    jwt.verify(adminToken, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.json(err);
      } else {
        console.log(decoded);
        let records = await usersMedicalRecords.find().select({
          _id: 0,
          symptoms: 1,
          result: 1,
        });
        console.log(`the records is : ${records}`);
        res.json({ message: "the records : " + records });
      }
    });
  }

  async changePassword(req, res) {
    let { id, oldPass, newPass } = req.body;
    console.log("hi password");
    console.log(id); //tmam
    //update password
    const thePerson = await AdminModel.findById(id);
    console.log(thePerson);
    const match = bcrypt.compareSync(oldPass, thePerson.password);
    //compare hash the given password in it
    if (match) {
      console.log(" logged in  !");
      bcrypt.hash(
        newPass,
        Number(process.env.HASH_ROUND),
        async function (err, hash) {
          newPass = hash;
          await AdminModel.findByIdAndUpdate(id, { password: newPass });
        }
      );
      res.json({ message: "password changed successfully !" });
    } else {
      //401 Unauthorized is the status code to return when the client provides no credentials or invalid credentials.
      res.json({ message: "oops the password may be wrong !" });
    }
  }
  //////////////////////////////////////////////////
  async adminShowAllDocs(req, res) {
    console.log("in the show doctors function");
    // let token = req.body.token;
    const token = req.body.token;

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.json(err);
      } else {
        console.log(`role = ${decoded.role}`);

        await doctorModel
          .find()
          .select({
            _id: 0,
            userName: 1,
            email: 1,
            specialization: 1,
          }) //gives me all items automatically
          .then((result) => {
            res.json(result); //return response in json format
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
  async showContacts(req, res) {
    console.log("in the show contacts function");
    // let token = req.body.token;

    await contactUsModel
      .find()
      .select({
        _id: 0,
        name: 1,
        email: 1,
        message: 1,
      }) //gives me all items automatically
      .then((result) => {
        res.json(result); //return response in json format
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
