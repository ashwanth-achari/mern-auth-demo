const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");
const {loginSchema,signUpSchema} = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

//public: Home route
router.route("/").get(authController.home);

//public: Register Route
router
.route("/register")
.post(validate(signUpSchema), authController.register);

//public: Login route
router
.route("/login")
.post(validate(loginSchema),authController.login);

//protected : get current loggen in user
router
.route("/user")
.get(authMiddleware, authController.user);

module.exports = router;
