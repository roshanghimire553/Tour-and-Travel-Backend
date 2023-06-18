const express = require("express");
const {
  createDays,
  getDaysByTourID,
  getAllDays,
  deleteDay,
} = require("../controller/daysController");
const router = express.Router();

router.route("/createDay/:tourID").post(createDays);
router.route("/getAllDay").get(getAllDays);
router.route("/getSingleDay/:tourID").get(getDaysByTourID);
router.route("/deleteDay/:dayId").delete(deleteDay);

module.exports = router;
