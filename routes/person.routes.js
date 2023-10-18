const personController = require("../controllers/personController");
const express = require("express");
const personRouter = express.Router();

const userAuth = require("../AuthAndValidation/auth");
const {
  validate,
  signUpSchema,
  logInSchema,
} = require("../AuthAndValidation/validation");

personRouter.post("/logIn", validate(logInSchema), personController.logIn);
personRouter.post("/changeProfileImage", personController.changeProfileImage);

module.exports = personRouter;
