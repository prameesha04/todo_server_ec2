import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization?.split(" ")[1];
  if (!authHeader) {
    return res.status(401).json({ message: "Not authorized, no token." });
  }

  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Not authorized." });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};
