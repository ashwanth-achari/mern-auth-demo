const Contact = require("../models/contact-model");

const contactForm = async (req, res, next) => {
  try {
    //this is already validated by zod 
    const {message} = req.body;

     // Build secure data using logged-in user
    const formData = {
      username: req.user.username,
      email: req.user.email,
      message,
    };
    
    //save form data to DB
    await Contact.create(formData);

    return res.status(200).json({
      msg: "Message sent successfully",
    });
  } catch (error) {
   // console.error("Contact Form Error:", error);
    next(error); 
  }
};

module.exports = contactForm;
