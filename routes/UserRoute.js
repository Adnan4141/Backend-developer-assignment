import express from "express";
import { getProfile, getUserPurchases, updateUser } from "../controllers/userController";
import { isAuthenticated } from "../middleware/isAuthenticated";

const userRouter = express.Router();

// -------- PUBLIC COURSES ---------------
userRouter.get("/courses", getAllCourses);
userRouter.get("/courses/:id", getCourseById);

// --------- PROTECTED USER ROUTES -----------
userRouter.use(isAuthenticated);

userRouter.get("/profile", getProfile);
userRouter.put("/profile", updateUser);
userRouter.get("/purchases", getUserPurchases);

export default userRouter;
