const nodemailer = require("nodemailer");
const mailShape = require("./email.form");
// const generateToken = require("../../util/generateToken.js");
let emalingForResetPass = async function sendMail(options) {
  console.log("hi from sending code in mail");
  console.log(options.email);
  console.log(options.code);

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "diagnosisassistant@gmail.com", // generated ethereal user
      pass: "gmqscgzyunjumelx",
    },
  });

  let info = await transporter.sendMail({
    from: '"nada soliman👻" <diagnosisassistant@gmail.com>', // sender address
    to: options.email, // list of receivers
    subject: "Hello ✔", // Subject line
    html: mailShape(options.code), // html body
  });
  console.log(`the info is : ${info}`);
  console.log("out of sending email");
};

module.exports = emalingForResetPass;
