const nodemailer = require("nodemailer");
const mailShape = require("./email.form");
const generateToken = require("../../util/generateToken.js");
let emaling = async function sendMail(options) {
  console.log("hi from sending email");
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "diagnosisassistant@gmail.com", // generated ethereal user
      pass: "gmqscgzyunjumelx",
    },
  });
  let token = generateToken({
    //if any one have the url then he can verify the email
    //check if the email in token equal email in the
    email: options.email,
  });
  let info = await transporter.sendMail({
    from: '"nada soliman👻" <diagnosisassistant@gmail.com>', // sender address
    to: options.email, // list of receivers
    subject: "Hello ✔", // Subject line
    html: mailShape(options.userName, token), // html body
  });
  console.log(`the info is : ${info}`);
  console.log("out of sending email");
};

module.exports = emaling;
