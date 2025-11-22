const User = require("../models/user-model");
const Contact = require("../models/contact-model");

//to get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    // console.log(users);

    if (!users || users.length === 0) {
      return res
      .status(404)
      .json({ message: "No users found" });
    }

    return res.status(200).json({ users });

  } catch (error) {
    console.error("error from admin-controller User:", error);
    next(error);
  }
};

//Get single User by ID
const getUserById = async (req, res,next) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({ _id: id }, { password: 0 });
    
     if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
     console.error("Error from admin-controller getUserById:", error);
    next(error);
  }
};

//Update User by ID
const updateUserById = async (req, res,next) => {
  try {
    const id = req.params.id;
    const updateUserData = req.body;
    
    const data = await User.updateOne(
      { _id: id }, 
      { $set: updateUserData }
    );

    //  check matchedCount 
    // if (result.matchedCount === 0) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error from admin-controller updateUserById:", error);
    next(error);
  }
};

//  Delete user By ID
const deleteUserById = async (req, res,next) => {
  try {
    const id = req.params.id;

    await User.deleteOne({ _id: id });

    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.error("Error from admin-controller deleteUserById:", error);
    next(error);
  }
};

// get all contacts
const getAllContacts = async (req, res,next) => {
  try {
    const contacts = await Contact.find();
    // console.log(contacts);

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }

    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error from admin-controller getAllContacts:", error);
    next(error);
  }
};

//Delete contact by Id
const deleteContactById = async (req, res,next) => {
  try {
    const id = req.params.id;

    await Contact.deleteOne({ _id: id });

    return res.status(200)
    .json({ message: "Contact Deleted Successfully" });
  } catch (error) {
    console.error("Error from admin-controller deleteContactById:", error);
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  getAllContacts,
  updateUserById,
  deleteContactById,
};
