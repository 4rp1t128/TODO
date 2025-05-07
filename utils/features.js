import jwt from "jsonwebtoken";


export const sendCookie = ((user,res,message,statusCode=200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    //201 - means created Successfully
    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
    }).json({
        success: true,
        message,
    });
});