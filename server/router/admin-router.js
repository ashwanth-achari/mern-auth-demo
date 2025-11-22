const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById,
} = require("../controllers/admin-controller");

const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const validate = require("../middlewares/validate-middleware");
const updateUserSchema = require("../validators/admin-validator");

//All routes are protected + admin

//get all user
router
.route("/users")
.get(authMiddleware, adminMiddleware, getAllUsers);

//get single user by ID
router
.route("/users/:id")
.get(authMiddleware, adminMiddleware, getUserById);

//update user by ID
router
  .route("/users/update/:id")
  .patch(
    authMiddleware,
    adminMiddleware,
    validate(updateUserSchema),
    updateUserById
  );

//Delete user by ID
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteUserById);

//get all contacts
router
.route("/contacts")
.get(authMiddleware, adminMiddleware, getAllContacts);

//delete contact by ID
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteContactById);

module.exports = router;
