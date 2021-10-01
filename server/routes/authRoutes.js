const { Router } = require("express");
const router = Router();

const authController = require("../controller/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/verifyuser", authController.verifyUser);
module.exports = router;
