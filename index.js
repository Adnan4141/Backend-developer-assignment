import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";

import connectDB from "./config/dbConfig.js";
import authRouter from "./routes/AuthRoute.js";
import userRouter from "./routes/UserRoute.js";
import courseRouter from "./routes/CourseRoute.js";
import purchaseRouter from "./routes/PurchaseRoute.js";




const app = express();
const __dirname = path.resolve();


const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan("dev"));


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/courses",courseRouter );
app.use("/api/purchases",purchaseRouter );



app.use(express.static(path.join(__dirname, "client", "dist")));


app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next(); // let 404 handler handle API requests
  }
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


app.get("/", (req, res) => {
  res.send("API is working...");
});


app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: true,
    message: "Route not found",
  });
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await connectDB();
});
