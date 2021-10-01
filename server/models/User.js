const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Duplicate Email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  // console.log("Before save");
  next();
});

// userSchema.post("save", function (doc, next) {
//   next();
// });

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const isAutenticated = await bcrypt.compare(password, user.password);
    if (isAutenticated) {
      return user;
    } else {
      throw Error("incorrect password");
    }
  } else {
    throw Error("incorrect username");
  }
};

const User = mongoose.model("user", userSchema);
module.exports = User;
