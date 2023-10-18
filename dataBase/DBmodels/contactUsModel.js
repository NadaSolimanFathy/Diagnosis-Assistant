const { boolean } = require("joi");
const mongoose = require("mongoose"); //with mongoose imported we can set up a connection
const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
  },

  {
    versionKey: false, // The __v field is called the version key. It describes the internal revision of a document. This __v field is used to track the revisions of a document. By default, its value is zero ( __v:0 ).
    // timestamps: true,
  }
);
const contactModel = mongoose.model("contactUs", contactSchema);

module.exports = contactModel;
