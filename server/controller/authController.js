const User = require("../models/User");
const jwt = require("jsonwebtoken");
const maxAge = 5 * 24 * 60 * 60;
const creatJWT = (id) => {
  return jwt.sign({ id }, "chatroom secret", {
    expiresIn: maxAge,
  });
};
const alertError = (err) => {
  let errors = { name: "", email: "", password: "" };
  if (err.message.includes("Duplicate Email")) {
    Object.values(err.errors).forEach((error) => {
      errors[properties.path] = properties.message;
    });
  }
  if (err.code === 11000) {
    errors.email = "This email already Registered";
    return errors;
  }
  console.log(errors);
};
module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = creatJWT(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user });
  } catch (err) {
    alertError(err);
    console.error(err);
    res.status(400).send("failed to Create");
  }
  res.send();
};

module.exports.login = (req, res) => {};

module.exports.logout = (req, res) => {};
