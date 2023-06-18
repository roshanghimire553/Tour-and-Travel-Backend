const express = require("express");
const {
  createContact,
  getAllContacts,
  deleteContact,
} = require("../controller/contactUsController");
const router = express.Router();

router.route("/").post(createContact);
router.route("/getAllContact").get(getAllContacts);
router.route("/deleteContact/:id").delete(deleteContact);

module.exports = router;
