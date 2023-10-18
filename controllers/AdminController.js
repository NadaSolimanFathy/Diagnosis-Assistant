const theAdminObject = require("../OOPmodels/oop_Admin.js");

exports.createAdmin = function (req, res) {
  let admin = new theAdminObject();
  admin.addNewAdmin(req, res);
};
exports.verifyEmail = function (req, res) {
  let admin = new theAdminObject();
  admin.verifyEmail(req, res, "admin");
};
// exports.logIn = function (req, res) {
//   console.log("in admin log in  controller");
//   let admin = new theAdminObject();
//   admin.logIn(req, res);
// };
exports.show = function (req, res) {
  console.log("in show controller");
  let admin = new theAdminObject();
  admin.showAllUsers(req, res);
};

exports.deleteUser = async function (req, res) {
  let admin = new theAdminObject();
  admin.deleteUser(req, res);
};

exports.retreiveMedicalRecords = async function (req, res) {
  console.log("admin data");
  let admin = new theAdminObject();
  admin.retreiveMedicalRecords(req, res);
};

exports.changePassword = async function (req, res) {
  console.log("admin change pass");
  let admin = new theAdminObject();
  admin.changePassword(req, res);
};

exports.adminShowAllDocs = function (req, res) {
  let admin = new theAdminObject();
  console.log("hi from  show doc ");
  admin.adminShowAllDocs(req, res);
};
exports.showContacts = async function (req, res) {
  let admin = new theAdminObject();
  console.log("contact us new function");
  admin.showContacts(req, res);
};
