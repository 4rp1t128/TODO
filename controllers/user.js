import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
    //accessing data from url through Query
    const name = req.query.name;
    const blood_type = req.query.blood_type;
    const sex = req.query.sex;
    console.log({ name, blood_type, sex });

    //reading all the data from DB and response in json 
    const users = await User.find({});//mongodb query to get all users detail


    res.json({
        success: true,
        users,
    });
};

export const register = async (req, res) => {


    const { name, email, password } = req.body;
    await User.create({ name, email, password });

    res.status(201).cookie("token", "dkjas", {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000),
    }).json({
        success: true,
        message: "Registered Successfully",
    })
};

export const getUserById = async (req, res) => {
    const { id } = req.params;//to access the params present in the URL
    const user = await User.findById(id);
    res.json({
        success: true,
        user,
    });
};

export const updateUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    res.json({
        success: true,
        message: "Updated Successfully",
    });
};

export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    // await user.remove();
     res.json({
        success: true,
        message: "Deleted Successfully",
    });
};

export const getUserSpecial = (req, res) => {
    res.json({
        success: true,
        message: "Just Joking",
    });
};