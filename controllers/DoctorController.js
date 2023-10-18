const theDoctorObject = require("../OOPmodels/oop_Doctor.js");

exports.createDoctor = function (req, res) {
  let doctor = new theDoctorObject();
  doctor.addNewDoctor(req, res);
};
exports.verifyEmail = function (req, res) {
  let doctor = new theDoctorObject();
  doctor.verifyEmail(req, res, "doctor");
};
//////////////ACTUAL WORK////////////////////////////////////////
// exports.logIn = function (req, res) {
//   let doctor = new theDoctorObject();
//   doctor.logIn(req, res);
// };
exports.showQuestions = function (req, res) {
  let doctor = new theDoctorObject();
  doctor.showUserQuestions(req, res);
};
exports.answerUserQuestions = function (req, res) {
  console.log("whattt");
  let doctor = new theDoctorObject();
  doctor.answerUserQuestions(req, res);
};
exports.getDoctors = function (req, res) {
  let doctor = new theDoctorObject();
  console.log("hi from doc controller");
  doctor.showDoc(req, res);
};
