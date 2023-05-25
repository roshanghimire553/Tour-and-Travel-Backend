const User = require("../models/userModel");

const cloudinary = require("cloudinary");
const mailVerification = require("./mailVerification");

// for user register//

exports.registerUser = async (req, res, next) => {
  try {
    // const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
    //   folder: "avatars",
    //   width: 150,
    //   crop: "scale",
    // });
    // console.log(myCloud);
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
      // profile_pic: {
      //   public_id: myCloud.public_id,
      //   url: myCloud.secure_url,
      // },
    });
    return res.status(200).json({
      message: "User Registered",
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
  console.log(req.user);
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
