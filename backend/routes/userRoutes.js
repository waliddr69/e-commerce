const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

const { registerUser,loginUser,getUser,handleLogout } = require("../controllers/userController");

router.route("/signup").post(registerUser);
router.route("/me").get(validateToken,getUser)
router.route("/login").post(loginUser);
router.route("/logout").get(require("../middleware/validateTokenHandler"),handleLogout);

module.exports = router;