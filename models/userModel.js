const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    minLength: 2,
  },

  email: {
    type: String,
    required: [true, "Please Enter your email"],
    validator: [validator.email, "Please enter a valid email"],
    unique: true,
  },
  profile_pic: {
    public_id: {
      type: String,

      default: "default.png",
    },
    url: {
      type: String,
      default: "default.png",
    },
  },

  password: {
    type: String,
    require: [true, "Please Enter your password"],
    minLength: [8, "Password must be greater than 8 Characters"],
  },

  role: {
    type: String,
    default: "user",
  },
  // searchHistory: {
  //   type: Array,
  //   default: [],
  // },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // True, False
};

userSchema.methods.getToken = function () {
  const token = jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

module.exports = mongoose.model("User", userSchema);
