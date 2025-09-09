import express from "express";
import {  login, logout, refresh, register } from "../controllers/authController";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { getProfile } from "../controllers/userController";
const authRouter = express.Router();



authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", logout);

// ================= PROTECTED ROUTES =================
authRouter.get("/profile", isAuthenticated, getProfile);

export default authRouter;
