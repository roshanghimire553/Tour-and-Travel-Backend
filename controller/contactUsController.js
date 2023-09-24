// controllers/contacts.js
const Contact = require("../models/contactUsModel");

// POST /api/contacts
exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create new contact
    const contact = new Contact({ name, email, message });
    await contact.save();

    return res
      .status(201)
      .json({ message: "Congratulation Message sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /api/contacts/:id
exports.deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    // Check if the contact exists
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Delete the contact
    await Contact.findByIdAndDelete(contactId);

    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//for gettinh all contacus//

exports.getAllContacts = async (req, res) => {
  try {
    // Retrieve all contacts
    const contacts = await Contact.find();

    return res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
