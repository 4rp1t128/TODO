import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req, res) => {

};

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
        return res.status(404).json({
            success: false,
            message: "User Already Exist"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    user = await User.create({ name, email, password: hashedPassword })

    sendCookie(user, res, "Register Successfully", 201)
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");//Select was false in schema which prevent us to access the user.password
    if (!user) {
        //404 - NOT FOUND
        return res.status(404).json({
            success: false,
            message: "Invalid Email or Password",
        });
    };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        //404 - NOT FOUND
        return res.status(404).json({
            success: false,
            message: "Invalid Email or Password",
        });
    };
    sendCookie(user, res, `Welcome Back, ${user.name}`, 200);
};

export const logout = (req,res)=>{
    res.status(200).cookie("token","",{expires: new Date(Date.now())}).json({
        success:true,
        message:"Logout Successfully",
    })
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

export const getMyProfile =  (req, res,next) => {
   
    res.status(200).json({
        success:true,
        user:req.user,
    });

};