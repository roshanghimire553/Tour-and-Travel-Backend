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
      days,
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
      days,
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
      days,
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
    const tour = await Tour.findById(id)
      .populate("reviews")
      .populate("days")
      .populate("category");

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
      .populate("days")
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

//search query for the user basesd on the user search//

exports.getTourBySearch = async (req, res) => {
  const city = req.query.city;
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    const searchTour = await Tour.find({
      city: { $regex: new RegExp(city, "i") },
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).lean(); // Add .lean() to return plain JavaScript objects instead of Mongoose documents

    res.status(200).json({
      success: true,
      message: "Tours Found",
      data: searchTour,
    });
  } catch (err) {
    res.status(500).json({
      // Change the status code to 500 for internal server error
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

//for  implementing search alogirith types is filtering and sorting//

/*The basic filtering algorithm used in the provided code snippet can be categorized 
as a "Search Algorithm". It performs a search operation on the collection of tours 
based on the specified filter parameters (priceRange, categoryId, city)
 and applies sorting based on the sortBy parameter.*/

/*In terms of algorithm and type, this code implements a basic filtering 
 and sorting algorithm using MongoDB's query language. It leverages 
 the filtering capabilities provided by MongoDB's $gte, $lte, 
 and $regex operators, as well as the sorting functionality offered by the .sort method.*/

exports.getFilteredAndSortedTours = async (req, res) => {
  try {
    const { priceRange, categoryId, city, sortBy } = req.query;

    const query = {};

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-");
      query.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    }

    if (categoryId) {
      query.category = categoryId; // Use categoryId instead of category
    }

    if (city) {
      query.city = { $regex: city, $options: "i" };
    }

    let sort = {};

    if (sortBy === "priceLowToHigh") {
      sort = { price: 1 };
    } else if (sortBy === "priceHighToLow") {
      sort = { price: -1 };
    }

    const tours = await Tour.find(query).sort(sort);

    res.json(tours);
  } catch (error) {
    console.log("Error fetching tours:", error);
    res.status(500).json({ error: "An error occurred while fetching tours" });
  }
};

//seudo code for this algorithmm//

/*function getFilteredAndSortedTours(req, res):
  try:
    // Parse query parameters
    priceRange = req.query.priceRange
    categoryId = req.query.categoryId
    city = req.query.city
    sortBy = req.query.sortBy

    // Initialize an empty query object
    query = {}

    // Parse price range
    if priceRange is not null:
      [minPrice, maxPrice] = parsePriceRange(priceRange)
      query.price = { $gte: minPrice, $lte: maxPrice }

    // Set category filter
    if categoryId is not null:
      query.category = categoryId

    // Set city filter (case-insensitive)
    if city is not null:
      query.city = { $regex: city, $options: "i" }

    // Initialize sorting criteria
    sort = {}

    // Determine sorting order
    if sortBy is "priceLowToHigh":
      sort.price = 1
    else if sortBy is "priceHighToLow":
      sort.price = -1

    // Fetch tours from the database based on filters and sorting
    tours = await queryToursFromDatabase(query, sort)

    // Send the JSON response
    res.json(tours)
  catch error:
    logError("Error fetching tours:", error)
    res.status(500).json({ error: "An error occurred while fetching tours" })

function parsePriceRange(priceRange):
  // Split the price range string into min and max values
  [minPrice, maxPrice] = priceRange.split("-")
  return [parseInt(minPrice), parseInt(maxPrice)]

function queryToursFromDatabase(query, sort):
  // Connect to the database and query tours using the provided query and sorting criteria
  // Return the list of tours
*/
