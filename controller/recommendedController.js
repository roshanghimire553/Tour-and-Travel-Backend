const Tour = require("../models/tourModel");

//recommended algorithm according to star//

exports.recommendTourPackages = async (req, res, next) => {
  try {
    // Find the tours with the highest ratings using the aggregation framework
    const recommendedTours = await Tour.aggregate([
      {
        $lookup: {
          from: "reviews", // Assuming your reviews collection is named 'reviews'
          localField: "reviews",
          foreignField: "_id",
          as: "reviewDetails",
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$reviewDetails.rating" },
        },
      },
      {
        $sort: { averageRating: -1 }, // Sort by highest average rating
      },
      {
        $limit: 10, // Limit the results to 10 recommended tours
      },
    ]);

    res.status(200).json({
      status: "success",
      data: recommendedTours,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Unable to fetch recommended tours",
    });
  }
};
