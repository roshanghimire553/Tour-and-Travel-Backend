const Tour = require("../models/tourModel");
const Review = require("../models/ratingModel");

//to create ratings//

exports.createReview = async (req, res) => {
  const tourID = req.params.tourID;
  //   console.log(tourID);
  const newReview = new Review({ ...req.body });
  try {
    const savedReview = await newReview.save();

    await Tour.findByIdAndUpdate(tourID, {
      $push: { reviews: savedReview._id },
    });
    return res.status(200).json({
      success: true,
      message: "Created successfully",
      data: savedReview,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//to find all the ratings//
exports.getAllRatings = async (req, res) => {
  try {
    const allRatings = await Review.find();
    return res.status(200).json({
      success: true,
      message: "successfully found reviews",
      data: allRatings,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//to delete ratings//

exports.deleteRatings = async (req, res) => {
  const id = req.params.id;
  try {
    await Review.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "successfully Deleted Reviews",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
