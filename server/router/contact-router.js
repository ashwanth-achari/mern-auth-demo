const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contact-controller");
const contactSchema = require("../validators/contact-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

//submit contact form
router
.route("/contact")
.post(authMiddleware,validate(contactSchema),contactController);

module.exports = router;