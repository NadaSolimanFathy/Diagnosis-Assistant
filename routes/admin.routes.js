const adminController = require("../controllers/AdminController");
const express = require("express");
const userAuth = require("../AuthAndValidation/auth");

const adminRouter = express.Router();
const adminAuth = require("../AuthAndValidation/auth");
const {
  validate,
  signUpSchema,
  logInSchema,
} = require("../AuthAndValidation/validation");

adminRouter.post("/addAdmin", adminController.createAdmin);
adminRouter.get("/verifyEmail/:token", adminController.verifyEmail);
// adminRouter.post("/logIn", validate(logInSchema), adminController.logIn);
adminRouter.post("/showUsers", adminController.show);
adminRouter.post("/delUser", adminController.deleteUser); //userAuth
adminRouter.get("/medicalRecords", adminController.retreiveMedicalRecords);
adminRouter.post("/changePassword", adminController.changePassword);
adminRouter.post("/showDoctors", adminController.adminShowAllDocs);
adminRouter.get("/showContacts", adminController.showContacts);

module.exports = adminRouter;
