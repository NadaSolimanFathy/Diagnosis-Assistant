const doctorController = require("../controllers/DoctorController");
const express = require("express");

const doctorRouter = express.Router();
const adminAuth = require("../AuthAndValidation/auth");
const {
  validate,
  signUpSchema,
  logInSchema,
} = require("../AuthAndValidation/validation");

doctorRouter.post("/addDoctor", doctorController.createDoctor);
doctorRouter.get("/verifyEmail/:token", doctorController.verifyEmail);
// doctorRouter.post("/logIn", validate(logInSchema), doctorController.logIn);
doctorRouter.post("/answerUserQuestions", doctorController.answerUserQuestions);
doctorRouter.get("/showQuestions", doctorController.showQuestions);
doctorRouter.post("/getDoctors", doctorController.getDoctors);

module.exports = doctorRouter;
