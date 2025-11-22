const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res
      .status(401)
      .json({ msg: "Unauthorized: Token not provided" });
    }

    const jwtToken = token.replace("Bearer", "").trim();
    // console.log("token from auth-middleware", jwtToken);

    //verify JWT
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    //fetch user
    const user = await User.findOne({ email: decoded.email }).select({
      password: 0,
    });

    if (!user) {
      return res
      .status(401)
      .json({ message: "Unauthorized: User not found" });
    }

    // Attach data to request object
    req.user = user;
    req.token = jwtToken;
    req.userId = user._id.toString();

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = authMiddleware;
