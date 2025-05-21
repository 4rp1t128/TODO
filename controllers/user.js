import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const user = await User.find({});
        if (!user) {
            return next(new ErrorHandler("User Not Found", 404));
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }

};

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return next(new ErrorHandler("User Already Exist", 400));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hashedPassword });

        sendCookie(user, res, "Register Successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");//Select was false in schema which prevent us to access the user.password
        if (!user) {
            //400 - Bad Request
            return next(new ErrorHandler("Invalid Credentials !!", 400))
        };
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            //404 - NOT FOUND
            return next(new ErrorHandler("Invalid Credential !!", 404))
        };
        sendCookie(user, res, `Welcome Back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
};

export const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        message: "Logout Successfully",
    });
};

// export const getMyProfile = async (req, res) => {

//     const{token} = req.cookies;
//     console.log(token);
//     if(!token){
//         return res.status(404).json({
//             success:false,
//             message:"Login First",
//         });
//     };

//     const decoded =  jwt.verify(token,process.env.JWT_SECRET);
//     const user = await User.findById(decoded._id);
//     res.status(200).json({
//         success:true,
//         user,
//     });

// };

export const getMyProfile = (req, res, next) => {

    res.status(200).json({
        success: true,
        user: req.user,
    });

};