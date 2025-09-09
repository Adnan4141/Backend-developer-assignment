import express from "express"
import morgan from "morgan";
import cors from 'cors'
import "dotenv/config";
import connectDB from "./config/dbConfig.js";
import authRouter from "./routes/AuthRoute.js";
import cookieParser from "cookie-parser";
import path from "path"




const app = express();
const __dirname = path.resolve();

const corsOptions = {
   origin: process.env.FRONTEND_URL || "https://localhost:3000" ,
   methods: ["GET", "POST", "PUT", "DELETE"],  
   credentials: true,  
 };


 //*** For JSON
app.use(express.json({ limit: '10mb' }));

// **For URL-encoded data
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cookieParser());
app.use(express.json())
app.use(cors(corsOptions));
app.use(morgan("dev"))








app.use(express.static(path.join(__dirname,"client/dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"client","index.html"))
})



app.get("/",(req,res)=>{
   res.send("Api is Workig.........")
})






app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    
    res.status(statusCode).json({
      success:false,
      statusCode,
      message
    })

})




//---route error handler--
app.use((req, res, next) => {
   res.status(404).json({
     message: "Route not found",
     success: false,
     error: true,
   });
 });


const PORT = process.env.PORT || 3000;
app.listen(PORT,async()=>{
   console.log(`Server is running in http://localhost:${PORT}`)
   await connectDB();
})