const Joi = require("joi");
const { model } = require("mongoose");
const userSchema = require("./schemas/user");
const jwt = require("jsonwebtoken");

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
};

const User = model("User", userSchema);

function validate(user) {
  const schema = new Joi.object({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    name: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().min(5).max(255).required(),
    phone: Joi.string().min(10).max(15).required(),
    address: Joi.string().min(5).max(255).required(),
    picture: Joi.string().min(5).max(1024),
    role: Joi.string()
      .min(5)
      .max(20)
      .required()
      .valid("admin", "gtf", "gc", "cs"),
    password: Joi.string().min(5).max(1024),
  });
  const result = schema.validate(user);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.User = User;
module.exports.validateUser = validate;
