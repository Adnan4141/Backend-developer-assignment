import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { getUserPurchases, purchaseCourse } from "../controllers/purchaseController.js";

const purchaseRouter = express.Router();


purchaseRouter.use(isAuthenticated);

purchaseRouter.post("/", purchaseCourse); 
purchaseRouter.get("/", getUserPurchases); 

export default purchaseRouter;
