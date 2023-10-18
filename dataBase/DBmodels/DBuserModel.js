const { boolean } = require("joi");
const mongoose = require("mongoose"); //with mongoose imported we can set up a connection
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    confirmedEmail: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    forgetCode: {
      type: Number,
      default: null,
    },
  },

  {
    versionKey: false, // The __v field is called the version key. It describes the internal revision of a document. This __v field is used to track the revisions of a document. By default, its value is zero ( __v:0 ).
    timestamps: true,
  }
);
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
