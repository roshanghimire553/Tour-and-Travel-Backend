const express = require("express");

//for the authentication//

const { isAuthenticated, authorizedRole } = require("../middleware/auth");

const {
  registerUser,
  login,
  logout,
  me,
  getAllUsers,
  getUser,
  deleteUser,
} = require("../controller/userController");
const { emailVerification } = require("../controller/mailVerification");

const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/register").post(registerUser);

router.route("/email").post(isAuthenticated, emailVerification);

router.route("/me").get(isAuthenticated, me);
//for user login//

router.route("/login").post(login);

//for admin  login
router.route("/Adminlogin").post(login);

//for logout//
router.route("/logout").post(logout);

//for getting all user//
router
  .route("/getUsers")
  .get(isAuthenticated, authorizedRole("admin"), getAllUsers);

router
  .route("/getUser/:id")
  .get(isAuthenticated, authorizedRole("admin"), getUser);

router
  .route("/deleteUsers/:id")
  .delete(isAuthenticated, authorizedRole("admin"), deleteUser);

module.exports = router;
