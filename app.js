import express from "express";
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

//we call config() function to load Environment Variable from .env file
config({
  path: "./config/config.env",
});


//Using Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,//to fetch header/cookies to the frontend
}))


//Using Routes
app.use("/api/v1/users", userRouter);//we can prefix in Router if users is common in all url
app.use("/api/v1/task",taskRouter);


app.get("/", (req, res) => {
  res.send("hi buddy");
});



//custom Error MiddleWare and keep it at last
app.use(errorMiddleWare);
// app.use((err,req,res,next)=>{
//   console.log(err.message);
//   return res.status(404).json({
//     success:false,
//     message:err.message,
//   })
// })

// app.get("/userid",async(req,res)=>{
//     const {id} = req.query;
//     const user = await User.findById(id);

//     res.json({
//       success:true,
//       user,
//     })
// })

