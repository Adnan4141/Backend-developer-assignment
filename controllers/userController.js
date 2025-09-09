
import PurchaseModel from "../models/PurchaseModel.js";
import UserModel from "../models/UserModel.js";
import errorHandler from "../utils/errorHandler.js";
import ResponseHandler from "../utils/ResponseHandler/ResponseHandler.js";


export const getProfile = async (req, res, next) => {
  try {
    if (!req.user) return next(errorHandler(401, "Unauthorized"));

    return ResponseHandler(
      res,
      200,
      { user: req.user },
      "User profile fetched successfully"
    );
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findById(req.user._id).select("+password");
    if (!user) return next(errorHandler(404, "User not found"));

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; 

    await user.save();

    return ResponseHandler(
      res,
      200,
      { user: { id: user._id, name: user.name, email: user.email, role: user.role } },
      "User profile updated successfully"
    );
  } catch (err) {
    next(err);
  }
};


export const getUserPurchases = async (req, res, next) => {
  try {
    const purchases = await PurchaseModel.find({ userId: req.user._id })
      .populate("courseId", "title price instructor")
      .sort({ createdAt: -1 });

    return ResponseHandler(
      res,
      200,
      { purchases },
      "User purchases fetched successfully"
    );
  } catch (err) {
    next(err);
  }
};
