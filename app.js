import express from "express";
import userRouter from './routes/user.js';
import { config } from "dotenv";
import cookieParser from "cookie-parser";

export const app = express();

config({
  path: "./config/config.env",
});


//Using Middleware
app.use(express.json());
app.use(cookieParser());

//Using Routes
app.use("/api/v1/users", userRouter);//we can prefix in Router if users is common in all url


app.get("/", (req, res) => {
  res.send("hi buddy");
});

// app.get("/userid",async(req,res)=>{
//     const {id} = req.query;
//     const user = await User.findById(id);

//     res.json({
//       success:true,
//       user,
//     })
// })

