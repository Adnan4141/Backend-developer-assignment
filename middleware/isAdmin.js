import errorHandler from "../utils/errorHandler.js";


export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return next(errorHandler(401, "Unauthorized access"));
  }

  if (req.user.role !== "admin") {
    return next(errorHandler(403, "Admin access required"));
  }

  next();
};
