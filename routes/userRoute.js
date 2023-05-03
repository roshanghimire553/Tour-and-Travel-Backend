const express = require("express");

//for the authentication//

const { isAuthenticated, authorizedRole } = require("../middleware/auth");

const { registerUser, login, logout } = require("../controller/userController");
const { emailVerification } = require("../controller/mailVerification");

const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.route("/").post(upload.single("avatar"), registerUser);

router.route("/email").post(emailVerification);
// router.post("/", registerUser);
router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;
