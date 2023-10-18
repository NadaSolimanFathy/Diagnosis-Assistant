const theUserObject = require("../OOPmodels/oop_User");
const personObject = require("../OOPmodels/OOP_Person");

exports.logIn = function (req, res) {
  let person = new personObject();
  person.logIn(req, res);
};
exports.changeProfileImage = function (req, res) {
  console.log("yes i am here");
  let person = new personObject();
  person.changeProfileImage(req, res);
};
