import CourseModel from "../models/CourseModel.js";
import errorHandler from "../utils/errorHandler.js";
import ResponseHandler from "../utils/ResponseHandler/ResponseHandler.js";




export const createCourse = async (req, res, next) => {
  try {
    const { title, description, price, instructor, category,  thumbnail } = req.body;

    if (!title || !description || !price || !instructor)
      return next(errorHandler(400, "Required fields are missing"));

    const course = await CourseModel.create({
      title,
      description,
      price,
      instructor,
      category,
      thumbnail,
    });

    return ResponseHandler(res, 201, { course }, "Course created successfully");
  } catch (err) {
    next(err);
  }
};


export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await CourseModel.find().sort({ createdAt: -1 });
    return ResponseHandler(res, 200, { courses }, "Courses fetched successfully");
  } catch (err) {
    next(err);
  }
};


export const getCourseById = async (req, res, next) => {
  try {
    const course = await CourseModel.findById(req.params.id);
    if (!course) return next(errorHandler(404, "Course not found"));

    return ResponseHandler(res, 200, { course }, "Course fetched successfully");
  } catch (err) {
    next(err);
  }
};


export const updateCourse = async (req, res, next) => {
  const id = req.params.id;
  try {
    const course = await CourseModel.findById(id);
    if (!course) return next(errorHandler(404, "Course not found"));

    Object.assign(course, req.body);
    await course.save();

    return ResponseHandler(res, 200, { course }, "Course updated successfully");
  } catch (err) {
    next(err);
  }
};


export const deleteCourse = async (req, res, next) => {
  try {
    const course = await CourseModel.findById(req.params.id);
    if (!course) return next(errorHandler(404, "Course not found"));

    await course.deleteOne();

    return ResponseHandler(res, 200, {}, "Course deleted successfully");
  } catch (err) {
    next(err);
  }
};
