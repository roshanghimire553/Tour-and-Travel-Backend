const Category = require("../models/categoryModel");
const Tour = require("../models/tourModel");

//to create category//

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = new Category({
      name,
    });
    const savedCategory = await category.save();
    res.status(200).json({
      success: true,
      message: "category create successfully",
      data: savedCategory,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//to fetch categoryData with tour//

exports.getToursByCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const tours = await Tour.find({ category: categoryId })
      .populate("category", "name")
      .exec();
    res.status(200).json({
      success: true,
      message: "Tours Found",
      data: tours,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Controller function to get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      success: true,
      message: "Categories Found",
      data: categories,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//for deleting categoryy//

exports.deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "failed to DeleteTour" });
  }
};
