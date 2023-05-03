const User = require("../models/userModel");

const cloudinary = require("cloudinary");
const mailVerification = require("./mailVerification");

// for user register//

exports.registerUser = async (req, res, next) => {
  try {
    console.log(req.file);
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //   folder: "avatars",
    //   width: 150,
    //   crop: "scale",
    // });
    // console.log("Here");
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
      //   url: myCloud.url,
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
  console.log(user);

  if (!user) {
    return res.json({
      success: false,
      message: "Invalid Credentials",
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
  res.cookie("token", token, {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  return res.status(200).json({
    success: true,
    user,
  });
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
