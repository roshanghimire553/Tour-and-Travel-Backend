const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
    },
    tourId: {
      type: mongoose.Types.ObjectId,
    },

    userEmail: {
      type: String,
    },
    tourName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    // bookAt: {
    //   type: Date,
    //   required: true,
    // },
    bookAt: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          // Check if the date is in the future
          return value > new Date();
        },
        message: "Booking date must be in the future",
      },
    },
    totalPrice: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
