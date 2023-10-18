const theUserObject = require("../OOPmodels/oop_User.js");
const errorHandle = require("./errorHandeling.js");
exports.createUser = function (req, res) {
  let user = new theUserObject();
  user.signUp(req, res);
};

// exports.logIn = function (req, res) {
//   console.log("from arwa front-end hi");
//   let user = new theUserObject();
//   // user.logIn(req, res);
//   errorHandle(user.logIn(req, res));
// };

exports.verifyEmail = async function (req, res) {
  let user = new theUserObject();
  user.verifyEmail(req, res, "user");
};
exports.enterSymptoms = async function (req, res) {
  let user = new theUserObject();
  user.enterSymptoms(req, res);
};
exports.retreiveMedicalRecords = async function (req, res) {
  let user = new theUserObject();
  user.retreiveMedicalRecords(req, res);
};
exports.sendFeedBack = async function (req, res) {
  let user = new theUserObject();
  console.log("hi hi from feed back front-end");
  console.log("please work");
  console.log(req.body);
  user.sendFeedBack(req, res);
};
exports.getFeedBacks = async function (req, res) {
  let user = new theUserObject();
  console.log("hi fofo");
  user.showFeedBacks(res);
};
exports.changePassword = async function (req, res) {
  let user = new theUserObject();
  user.updatePassword(req, res);
};
exports.changeAddress = async function (req, res) {
  let user = new theUserObject();
  user.updateAddress(req, res);
};
exports.showAllQuestions = async function (req, res) {
  let user = new theUserObject();
  console.log("hi nono");
  user.showUserQuestions(req, res);
};
exports.askQuestion = async function (req, res) {
  let user = new theUserObject();
  user.askQuestion(req, res);
};

exports.contactUs = async function (req, res) {
  let user = new theUserObject();
  console.log("contact us new function");
  user.contactUs(req, res);
};

exports.deleteMyAcc = async function (req, res) {
  let user = new theUserObject();
  console.log("contact us new function");
  user.deleteUser(req, res);
};
/////////////////////////////
exports.sendCode = async function (req, res) {
  let user = new theUserObject();
  user.sendCode(req, res);
};
exports.restPassword = async function (req, res) {
  let user = new theUserObject();
  user.restPassword(req, res);
};

//The json() method of the Response interface takes a Response stream and reads it to completion. It returns a promise which resolves with the result of parsing the body text as JSON.

//Note that despite the method being named json(), the result is not JSON but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.
//////////////////////////////////////////////////

// EXPRESS res.json([body])
//Sends a JSON response.
//This method sends a response (with the correct content-type)
//that is the parameter converted to a JSON string using JSON.stringify().
//The parameter can be any JSON type, including object, array, string,
//Boolean, number, or null, and you can also use it to convert other values to JSON.
//////////////////
//res.json( [body] )
//Parameters: The body parameter is the body which is to be sent in the response.
//Return Value: It returns an Object.
//return response in json format
///////////////////////////////////////////////////////////////

//They are the complete opposite of each other.

//JSON.parse() is used for parsing data that was received as JSON; it deserializes a JSON string into a JavaScript object.

//JSON.stringify() on the other hand is used to create
//a JSON string out of an object or array;
//it serializes a JavaScript object into a JSON string.

////////////////////////////////////////////////////////////////
//The json() method of the Response interface takes a Response stream and reads it to completion.
//It returns a promise which resolves with the result of parsing the body text as JSON.
//Note that despite the method being named json(),
// the result is not JSON but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.
