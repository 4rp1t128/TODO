import {app} from './app.js'
import { connectDB } from "./config/database.js";

connectDB();
//console.log(process.env.PORT);
//"start": "set NODE_ENV=Production&&node server.js",
// "dev": "set NODE_ENV=Development&&nodemon server.js",
app.listen(process.env.PORT, (res, req) => {
    console.log(`Server is working on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
  });
  