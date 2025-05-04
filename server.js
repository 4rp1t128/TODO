import {app} from './app.js'
import { connectDB } from "./config/database.js";

connectDB();
//console.log(process.env.PORT);

app.listen(process.env.PORT, (res, req) => {
    console.log("Server is working");
  });
  