const { boolean } = require("joi");
const mongoose = require("mongoose");
const userModel = require("./DBuserModel");
//with mongoose imported we can set up a connection
const feedBackSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      ref: userModel,
    },
    comment: {
      type: String,
    },
  },

  {
    versionKey: false, // The __v field is called the version key. It describes the internal revision of a document. This __v field is used to track the revisions of a document. By default, its value is zero ( __v:0 ).
    timestamps: true,
  }
);
const feedBackModel = mongoose.model("FeedBack", feedBackSchema);

module.exports = feedBackModel;
