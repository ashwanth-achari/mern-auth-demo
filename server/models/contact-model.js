const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

//Model --> connects schema to collection
const Contact = model("contact", contactSchema);

module.exports = Contact;
