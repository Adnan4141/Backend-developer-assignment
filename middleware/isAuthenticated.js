import jwt from "jsonwebtoken";

import errorHandler from "../utils/errorHandler.js";
import UserModel from "../models/UserModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req?.cookies?.access_token;

    if (!token) return next(errorHandler(401, "Access token not found"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return next(errorHandler(401, "Unauthorized access"));

    
    const user = await UserModel.findById(decoded.id).select("-password -refreshToken");
    if (!user) return next(errorHandler(401, "User not found"));

    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);

    if (error.name === "TokenExpiredError") {
      res.clearCookie("access_token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      return next(errorHandler(401, "Token expired"));
    }

    return next(errorHandler(401, error.message));
  }
};
