import express from "express";
import { getProfile,  updateUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { getUserPurchases } from "../controllers/purchaseController.js";
import { getAllCourses, getCourseById } from "../controllers/courseController.js";

const userRouter = express.Router();



// --------- PROTECTED USER ROUTES -----------
userRouter.use(isAuthenticated);

userRouter.get("/profile", getProfile);
userRouter.put("/profile", updateUser);
userRouter.get("/purchases", getUserPurchases);

export default userRouter;
