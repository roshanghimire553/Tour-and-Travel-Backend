const Tour = require("../models/tourModel");
const cloudinary = require("cloudinary");

//for updating tours card//
exports.createTour = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }
    const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "Tours",
    });

    const {
      title,
      city,
      address,
      distance,
      desc,
      price,
      maxGroupSize,
      category,
      reviews,
    } = req.body;

    const tour = new Tour({
      title,
      city,
      address,
      distance,
      photo: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      desc,
      price,
      maxGroupSize,
      category,
      reviews,
    });

    const savedTour = await tour.save();

    return res.status(200).json({
      success: true,
      message: "Created successfully",
      data: savedTour,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateTour = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedData = ({
      title,
      city,
      address,
      distance,
      desc,
      price,
      maxGroupSize,
      category,
      reviews,
    } = req.body);
    console.log(req.body);

    // Check if a file was uploaded
    if (req.file) {
      const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "Tours",
      });

      // Update the photo property with the new file data
      updatedData.photo = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedTour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTour,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

//for deleting tours//
exports.deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to DeleteTour" });
  }
};

//for get single tour//

exports.getSingleTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findById(id).populate("reviews");

    if (!tour) {
      // If no tour is found, return a 404 response
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    // If a tour is found, return a 200 response with the tour data
    res.status(200).json({
      success: true,
      message: "Tour found",
      data: tour,
    });
  } catch (err) {
    // If an error occurs during the database query, return a 500 response
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

//for get all tour card//

exports.getAllTour = async (req, res) => {
  try {
    const allTour = await Tour.find({})
      .populate("category")
      .populate("reviews");

    res.status(200).json({
      success: true,
      message: "Tours Found",
      data: allTour,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

exports.searchTour = async (req, res) => {
  try {
    const allTour = await Tour.find({});
    console.log(city);
    const { city, distance, maxGroupSize } = req.params;
    res.json(city);
    return;
    res.status(200).json({
      success: true,
      message: "Tours Found",
      data: allTour,
      city: city,
      distance: distance,
      maxGroupSize: maxGroupSize,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};
// getting search tours//

// exports.getTourBySearch = async (req, res) => {
//   //here 'i' means case sensitive//
//   // const city = await new RegExp(req.query.city, "i");
//   const city = new RegExp(req.query.city, "i").toString();
//   console.log(req.params);
//   return;
//   const distance = parseInt(req.query.distance);
//   const maxGroupSize = parseInt(req.query.maxGroupSize);

//   try {
//     const searchTour = await Tour.find({
//       city,
//       distance: { $gte: distance },
//       maxGroupSize: { $gte: maxGroupSize },
//     });
//     res.status(200).json({
//       success: true,
//       message: "Tours Found",
//       data: searchTour,
//     });
//   } catch (err) {
//     res.status(404).json({
//       success: false,
//       message: "Not Found",
//     });
//   }
// };
