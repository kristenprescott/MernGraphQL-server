const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  // TODO: add userImage
  // userImage: String,
  createdAt: String,
});

module.exports = model("User", userSchema);
