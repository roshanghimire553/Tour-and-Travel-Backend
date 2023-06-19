const express = require("express");
const {
  createTour,
  updateTour,
  deleteTour,
  getSingleTour,
  getAllTour,
  getTourBySearch,
  getFilteredAndSortedTours,
} = require("../controller/tourController");
const router = express.Router();
const multer = require("multer");
const { isAuthenticated } = require("../middleware/auth");
const upload = multer({ dest: "uploadTour/" });

//create new tour
// router.route("/").post(createTour);
router.route("/create").post(upload.single("photo"), createTour);

//for updaating tours//
router.route("/update/:id").put(upload.single("photo"), updateTour);
//for deleting tour
router.route("/:id").delete(deleteTour);
//for getting single tour
router.route("/:id").get(getSingleTour);
//for getting all tours/
router.route("/").get(getAllTour);

//get tour by search//
router.route("/search").post(getTourBySearch);
// router.route("/SearchTour").get(getTourBySearch);

//for  implementing search alogirith types is filtering and sorting//
router.route("/searchAlgorithm").post(getFilteredAndSortedTours);

module.exports = router;
