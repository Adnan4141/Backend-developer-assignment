import CourseModel from "../models/CourseModel.js";
import PurchaseModel from "../models/Purchase.js";
import errorHandler from "../utils/errorHandler.js";
import ResponseHandler from "../utils/ResponseHandler/ResponseHandler.js";


export const purchaseCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    if (!courseId) return next(errorHandler(400, "Course ID is required"));

    const course = await CourseModel.findById(courseId);
    if (!course) return next(errorHandler(404, "Course not found"));

    const alreadyPurchased = await PurchaseModel.findOne({
      userId: req.user._id,
      courseId: course._id,
    });

    if (alreadyPurchased) {
      return next(errorHandler(400, "Course already purchased"));
    }

    const purchase = await PurchaseModel.create({
      userId: req.user._id,
      courseId: course._id,
      amount: course.price,
      date: new Date(),
    });

  
    course.enrolledCount += 1;
    await course.save();

    return ResponseHandler(
      res,
      201,
      { purchase },
      "Course purchased successfully"
    );
  } catch (err) {
    next(err);
  }
};


export const getUserPurchases = async (req, res, next) => {
  try {
    const purchases = await PurchaseModel.find({ userId: req.user._id })
      .populate("courseId", "title description price instructor")
      .sort({ date: -1 });

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
