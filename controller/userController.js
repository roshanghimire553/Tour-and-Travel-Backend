const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const cloudinary = require("cloudinary");
const mailVerification = require("./mailVerification");

// for user register//

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "user already exist" });
    }
    user = await User.create({
      name,
      email,
      password,
    });
    await mailVerification.emailVerification(user.email);
    res.status(200).json({
      message: "User registered and welcome email sent",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

//for user login//

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.json({
      success: false,
      message: "Invalid Username",
    });
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.json({
      success: false,
      message: "Invalid Credentials",
    });
  }
  const token = user.getToken();
  // res.json("token", token, {
  //   expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  //   httpOnly: true,
  // });

  return res.status(200).json({
    success: true,
    // user,
    user: user,
    role: user.role,
    token: token,
  });
};

// exports.Adminlogin = async (req, res, next) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email: email, role: "admin" });
//   console.log(user);

//   if (!user) {
//     return res.json({
//       success: false,
//       message: "Invalid Credentials",
//     });
//   }

//   const isPasswordValid = await user.comparePassword(password);
//   if (!isPasswordValid) {
//     return res.json({
//       success: false,
//       message: "Invalid Credentials",
//     });
//   }
//   const token = user.getToken();
//   // res.json("token", token, {
//   //   expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
//   //   httpOnly: true,
//   // });

//   return res.status(200).json({
//     success: true,
//     // user,
//     token: token,
//   });
// };

exports.me = async (req, res, next) => {
  const { email } = req.user;
  res.json(req.user);
};

// for logout

exports.logout = (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  return res.status(200).json({
    success: true,
    message: "The User is logged out",
  });
};

//for getting single user //

exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    success: true,
    user,
  });
};

//for getting multiple user//
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
};

//for deleting users//

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "somethings went wrong" });
  }
};

//for admin login//

exports.updateUserRole = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const role = user.role == "admin" ? "user" : "admin";
  user.role = role;
  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
};

//for changing user password//

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.params.id);
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    if (oldPassword === newPassword) {
      return res
        .status(401)
        .json({ message: " old password and new password matched" });
    }

    user.password = newPassword;
    await user.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Change Notification[Tours and Travel]",
      html: "<b>Your password has been successfully changed.<br>",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        // Even if email sending fails, continue with the response
        res.status(200).json({ message: "Password changed successfully" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Password changed successfully" });
      }
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
