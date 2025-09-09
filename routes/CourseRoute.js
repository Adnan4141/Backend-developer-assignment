import express from "express";
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from "../controllers/courseController.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";


const courseRouter = express.Router();

//-------------- PUBLIC ROUTES ------------
courseRouter.get("/", getAllCourses);
courseRouter.get("/:id", getCourseById);

//--------ADMIN PROTECTED ROUTES ------------
// courseRouter.use(isAuthenticated, isAdmin);

courseRouter.post("/", createCourse);
courseRouter.put("/:id", updateCourse);
courseRouter.delete("/:id", deleteCourse);

export default courseRouter;
