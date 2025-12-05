import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import ApiError from "../utils/api.error.js";
import { JWT_SECRET } from "../config/env.config.js";

const auth = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied, no token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token" });
    }
  };
};

export default auth;

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, "No token provided"));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    next(new ApiError(httpStatus.UNAUTHORIZED, "Invalid token"));
  }
};
