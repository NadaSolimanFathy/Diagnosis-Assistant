const userController = require("../controllers/userController");

const express = require("express");

const userRouter = express.Router();
const userAuth = require("../AuthAndValidation/auth");
const {
  validate,
  signUpSchema,
  logInSchema,
} = require("../AuthAndValidation/validation");

userRouter.post("/newUser", validate(signUpSchema), userController.createUser);
userRouter.get("/verifyEmail/:token", userController.verifyEmail);

// userRouter.post("/logIn", validate(logInSchema), userController.logIn);

userRouter.post("/enterSymptoms", userController.enterSymptoms);
userRouter.post("/recordes", userController.retreiveMedicalRecords);
userRouter.post("/feedBack", userController.sendFeedBack);
userRouter.get("/feedBacks", userController.getFeedBacks);
userRouter.post("/changePassword", userController.changePassword);
userRouter.post("/changeAddress", userController.changeAddress);
userRouter.get("/showAllQuestions", userController.showAllQuestions);
userRouter.post("/askQuestion", userController.askQuestion);

userRouter.post("/contactUs", userController.contactUs);

userRouter.post("/deleteMyAcc", userController.deleteMyAcc);
userRouter.post("/sendCode", userController.sendCode);
userRouter.post("/restPassword", userController.restPassword);

module.exports = userRouter;
