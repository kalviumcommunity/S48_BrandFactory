const Joi = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  UserName: String,
  Email: String,
  Password: String,
});

const userValidationSchema = Joi.object({
  UserName: Joi.string().required(),
  Email: Joi.string().email().required(),
  Password: Joi.string().required()
});

const userModel = mongoose.model("users", UserSchema);
module.exports = {userModel,userValidationSchema};