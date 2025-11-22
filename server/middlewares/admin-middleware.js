const adminMiddleware = async (req, res, next) => {
  try {
    // Ensure req.user exists (set by authMiddleware)
    if (!req.user) {
      return res
      .status(401)
      .json({ message: "Unauthorized: No user found" });
    }

    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Access Denied. User is not an Admin" });
    }
    // console.log(isAdmin);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
