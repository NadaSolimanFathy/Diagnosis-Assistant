const joi = require("joi");

function validate(schema) {
  return (req, res, next) => {
    let { error } = schema.validate(req.body, { abortEarly: false });

    if (error != undefined) {
      res.json({ message: "error!", error });
      console.log("errrrrrrrrrrorrrrrrr");
    } else {
      next();
    }
  };
}

const logInSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: ["com"] } })
    .required(),
  password: joi.string().min(4).max(20).required(),
  // role: joi.string().min(4).max(6).required(),
});
const signUpSchema = joi.object({
  userName: joi.string().min(5).max(20).required(),
  password: joi.string().min(4).max(20).required(),
  rePassword: joi.string().required().valid(joi.ref("password")),
  // gender: joi.string().pattern(/^(female|male)$/),
  // string().min(4).max(6).required(),
  email: joi
    .string()
    .email({ tlds: { allow: ["com"] } })
    .required(),
  address: joi.string().min(4).max(40).required(),
});

module.exports = { validate, logInSchema, signUpSchema };
