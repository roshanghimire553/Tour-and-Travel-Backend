const express = require("express");
const router = express.Router();

const {
  createReview,
  getAllRatings,
  deleteRatings,
} = require("../controller/ratingController");

//to post ratings
router.route("/create/:tourID").post(createReview);
//to find ratings//
router.route("/findRatings").get(getAllRatings);
//to delete ratings
router.route("/deleteRatings/:id").delete(deleteRatings);

module.exports = router;
