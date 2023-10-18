const DoctorModel = require("../dataBase/DBmodels/DoctorModel");
const Person = require("./OOP_Person.js");
const bcrypt = require("bcrypt");
const generateToken = require("../util/generateToken.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userQuestions = require("../dataBase/DBmodels/userQuestions");
const userModel = require("../dataBase/DBmodels/DBuserModel.js");

module.exports = class Doctor extends Person {
  constructor() {
    super();
  }
  async addNewDoctor(req, res) {
    let { userName, password, email, address, specialization } = req.body;
    let confirmedEmail = false;
    DoctorModel.findOne({ email }, (err, item) => {
      if (item) {
        res.json({ message: "sorry its already found" });
      } else {
        bcrypt.hash(
          password,
          Number(process.env.HASH_ROUND),
          async function (err, hash) {
            password = hash;
            await DoctorModel.insertMany({
              userName,
              password,
              email,
              address,
              confirmedEmail,
              specialization,
            }).catch((err) => {
              res.json("error");
            });
            res.json("new doctor added, done!");
          }
        );
      }
    });
  }

  async answerUserQuestions(req, res) {
    const { answer, questionNumber, doctorToken } = req.body;
    console.log(answer);
    jwt.verify(
      doctorToken,
      process.env.JWT_SECRET_KEY,
      async (err, decoded) => {
        if (err) {
          return res.json(err);
        } else {
          console.log("the token is correct");
          let answeredBy = decoded.userId;
          let doctorName = decoded.name;

          let response = await userQuestions.findOneAndUpdate(
            { questionNumber: questionNumber },
            {
              answer,
              answeredBy,
              doctorName,
            },
            { new: true }
          );
          res.json(response);
        }
      }
    );
    // res.send(response);
  }

  //   async answerUserQuestions(req,res){
  //     let{ answer,answeredBy} = req.body

  //      await  questionModel.insertMany({ answer, answeredBy})
  //      res.json({  message: " Answer sent" })

  //  }

  async showDoc(req, res) {
    const { token, specialization } = req.body;
    let myuser;
    let userAddress;

    console.log("the token is : " + token);
    console.log("the specialization is : " + specialization);

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.json(err);
      } else {
        console.log("hi from nada ");
        console.log(decoded);
        let myId = decoded.userId;
        console.log(myId);
        myuser = await userModel.findById(myId, { address: 1, _id: 0 });
        userAddress = myuser.address;
        console.log(userAddress);
        let doctor = await DoctorModel.find(
          {
            specialization: specialization,
            address: userAddress,
          },
          { userName: 1, specialization: 1, _id: 0 }
        );
        console.log("ooh");
        console.log(doctor);
        res.json(doctor);
      }
    });

    console.log("hi hi hi");
  }
};
