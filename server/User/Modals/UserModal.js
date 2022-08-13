const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  confirmpassword: String,
});

const UserModal = mongoose.model("User", UserSchema);
module.exports = UserModal;
