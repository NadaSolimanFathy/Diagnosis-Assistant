const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  console.log("hi from auth");
  const token = req.body.token;
  JWT_SECRET_KEY = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY,
    async function (err, decoded) {
      //decoded is the payload inside token
      if (err) {
        res.json({ message: "error in token or token not provided", err });
      } else {
        console.log(`decoded data : ${decoded}`);
        next();
      }
    }
  );
};
module.exports = userAuth;
