const express = require("express");
const router = express.Router();
const Category = require("../models/categoryModel");
const Tour = require("../models/tourModel");

const {
  createCategory,
  getToursByCategory,
  getAllCategories,
  deleteCategory,
} = require("../controller/categoryController");

//to create category//
router.route("/").post(createCategory);
router.route("/Get").get(getAllCategories);
//to find category tours//
router.route("/:id").get(getToursByCategory);

//for deleting category//
router.route("/:id").delete(deleteCategory);

module.exports = router;
