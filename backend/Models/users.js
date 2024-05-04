const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  UserName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('Password')) return next();
    this.Password = await bcrypt.hash(this.Password, 12);
    next();
});

const userValidationSchema = Joi.object({
  UserName: Joi.string().required(),
  Email: Joi.string().email().required(),
  Password: Joi.string().min(6).required()
});

const userModel = mongoose.model("users", UserSchema);
module.exports = { userModel, userValidationSchema };
