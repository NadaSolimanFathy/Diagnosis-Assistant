const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  let token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
  return token;
};

module.exports = generateToken;
