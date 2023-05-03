const nodemailer = require("nodemailer");

// const dotenv = require("dotenv");
// dotenv.config({ path: "backend/config/.env" });
// const { EMAIL, PASSWORD } = require({ path: "backend/config/.env" });
// import { registerUser } from "./userController";
// import  email from ("./userController");

exports.emailVerification = async (req, res) => {
  try {
    let config = await {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    };
    const { email } = req.user;

    let transporter = nodemailer.createTransport(config);

    let message = {
      from: process.env.EMAIL,
      to: email,
      subject: "Hello your email is used",
      text: "successfully registered with us",
      html: "<b>successfully registered <br>",
    };

    await transporter.sendMail(message);

    return res.status(201).json({
      msg: "you received an email",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// module.exports = emailVerification;
