const mongoose = require("mongoose");
mongoose.set("strictQuery", false); //to avoid console warning

module.exports = mongoose
  .connect(process.env.DB_CONNECTION)
  .then((result) => {
    console.log("connection done ");
  })
  .catch((err) => {
    console.log(err);
  });
