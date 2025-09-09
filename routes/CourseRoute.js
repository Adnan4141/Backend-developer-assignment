import express from "express";
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from "../controllers/courseController";
import { isAdmin } from "../middleware/isAdmin";
import { isAuthenticated } from "../middleware/isAuthenticated";


const courseRouter = express.Router();

//-------------- PUBLIC ROUTES ------------
courseRouter.get("/", getAllCourses);
courseRouter.get("/:id", getCourseById);

//--------ADMIN PROTECTED ROUTES ------------
courseRouter.use(isAuthenticated, isAdmin);

courseRouter.post("/", createCourse);
courseRouter.put("/:id", updateCourse);
courseRouter.delete("/:id", deleteCourse);

export default courseRouter;
