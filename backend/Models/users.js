const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  UserName:String,
  Email:String,
  Password:String,
});

// Create a model from the schema
const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;