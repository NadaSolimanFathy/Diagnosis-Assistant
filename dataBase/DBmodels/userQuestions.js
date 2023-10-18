const { boolean } = require("joi");
const mongoose = require("mongoose");
const userModel = require("./DBuserModel");
const doctorModel = require("./DoctorModel");

//with mongoose imported we can set up a connection

const userQuestionsSchema = mongoose.Schema(
  {
    questionNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    question: {
      type: String,
    },

    answer: {
      type: String,
      default: "",
    },
    doctorName: {
      type: String,
      default: "",
    },
    askedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
    },
    answeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: doctorModel,
    },
  },

  {
    versionKey: false, // The __v field is called the version key. It describes the internal revision of a document. This __v field is used to track the revisions of a document. By default, its value is zero ( __v:0 ).
    timestamps: true,
  }
);
const userQuestionsModel = mongoose.model("userQuestion", userQuestionsSchema);

module.exports = userQuestionsModel;
