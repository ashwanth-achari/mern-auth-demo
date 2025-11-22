const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// Home Logic //for testing
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome by controller Home Page");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//Register
const register = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { username, email, phone, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already Exists" });
    }

    //Create new user
    const userCreated = await User.create({ username, email, phone, password });

    //send res with token
    res.status(201).json({
      msg: "User created successfully",
      token: await userCreated.generateWebToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    //console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    //const isPasswordMatched = await bcrypt.compare(password, userExist.password)
    const isPasswordMatched = await userExist.comparePassword(password);
    // console.log(isPasswordMatched)

    if (isPasswordMatched) {
      res.status(200).json({
        msg: "Login successful",
        token: await userExist.generateWebToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(401).json({ message: "Invalid Password" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//get logged-in user data
const user = async (req, res,next) => {
  try {
    const userData = req.user;
    // console.log("userdata",userData);

    if (!userData) {
      // just in case authMiddleware fails to attach
      return res.status(401).json({ message: "User not authorized" });
    }

    return res.status(200).json({ userData });
  } catch (error) {
    // 
    next(error);
  }
};

module.exports = { home, register, login, user };
