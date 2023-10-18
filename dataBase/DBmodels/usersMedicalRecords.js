const mongoose = require("mongoose"); //with mongoose imported we can set up a connection
const userModel = require("./DBuserModel");
const medicalRecordSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
    },
    symptoms: [],
    result: String,
  },

  {
    versionKey: false, // The __v field is called the version key. It describes the internal revision of a document. This __v field is used to track the revisions of a document. By default, its value is zero ( __v:0 ).
    timestamps: true,
  }
);
const medicalRecordModel = mongoose.model(
  "userMedicalRecord",
  medicalRecordSchema
);

module.exports = medicalRecordModel;
