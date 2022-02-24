const mongoose = require("mongoose");
const brcypt = require("bcrypt");
const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

usersSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await brcypt.hash(user.password, 8);
  }
});

module.exports = mongoose.model("Users", usersSchema);
