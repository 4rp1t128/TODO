import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";

export const isAuthenticated = async (req, res, next) => {

    const { token } = req.cookies;

    //console.log(token);

    if (!token) {
        return next(new ErrorHandler("Login First",404));
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
};