const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  photo: {
    public_id: {
      type: String,

      default: "default.png",
    },
    url: {
      type: String,
      default: "default.png",
    },
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxGroupSize: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },

  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
  ],
  // featured: {
  //   type: Boolean,
  //   dafault: false,
  // },
});

module.exports = mongoose.model("Tour", tourSchema);
