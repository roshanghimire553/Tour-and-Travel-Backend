const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userEmail: {
    type: String,
  },
  tourTitle: {
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
    validate: {
      validator: function (value) {
        const phoneNumberRegex = /^\d{10}$/;
        return phoneNumberRegex.test(value);
      },
      message: "Phone number must be a 10-digit number",
    },
  },
  status: {
    type: String,
    enum: ["pending", "approved", "booked"],
    default: "pending",
  },

  // bookAt: {
  //   type: String,
  //   required: true,
  //   validate: {
  //     validator: function (value) {
  //       // Check if the date is in the future
  //       const today = new Date().toISOString().split("T")[0];
  //       return value > today;
  //     },
  //     message: "Booking date must be in the future",
  //   },
  // },
  totalPrice: {
    type: Number,
    require: true,
  },

  bookAt: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        // Check if the date is in the future
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set today's time to 00:00:00
        return value > today;
      },
      message: "Booking date must be in the future",
    },
  },
});

bookingSchema.set(
  "toJSON",
  {
    transform: function (doc, ret) {
      // Convert the bookAt field to the desired format
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const formattedDate = ret.bookAt.toLocaleString("en-US", options);

      ret.bookAt = formattedDate;

      return ret;
    },
  },
  { timestamps: true }
);
// bookingSchema.pre("save", function (next) {
//   // Format the bookAt field before saving
//   this.bookAt = this.bookAt.toISOString().slice(0, 19).replace("T", " ");
//   next();
// });

module.exports = mongoose.model("Booking", bookingSchema);
