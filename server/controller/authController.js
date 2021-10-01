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
      error[properties.path] = properties.message;
    });
  }
  if (err.code === 11000) {
    errors.email = "This email already Registered";
    return errors;
  }
  console.log(errors);
};

// const alertError = (err) => {
//   let errors = { name: "", email: "", password: "" };
//   if (err.message.includes("Duplicate Email")) {
//     Object.values(err.errors).forEach((error) => {
//       error[properties.path] = properties.message;
//     });
//   }
//   if (err.code === 11000) {
//     errors.email = "This email already Registered";
//     return errors;
//   }
//   console.log(errors);
// };
module.exports.signup = async (req, res, next) => {
  // console.log("server", req.body);
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    // console.log(user);
    const token = creatJWT(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user });
  } catch (err) {
    alertError(err);
    console.log("server err", err);
    res.status(400).send("failed to Create");
  }
  res.send();
};

module.exports.login = async (req, res) => {
  // console.log("server", req.body);
  const { email, password } = req.body;
  try {
    const user = await User.login({ name, email, password });
    // console.log(user);
    const token = creatJWT(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user });
  } catch (err) {
    alertError(err);
    console.log("server err", err);
    res.status(400).send("failed to Create");
  }
  res.send();
};
module.exports.verifyUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "chatroom secret", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        let user = await User.findById(decodedToken.id);
        res.json(user);
        next();
      }
    });
  } else {
    next();
  }
};
module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ logout: true });
};
