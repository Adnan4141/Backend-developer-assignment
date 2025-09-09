import express from "express";
import {  login, logout, refresh, register } from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { getProfile } from "../controllers/userController.js";
const authRouter = express.Router();



authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", logout);

export default authRouter;
