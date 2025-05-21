import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        await Task.create({
            title,
            description,
            user: req.user,
        });
        res.status(201).json({
            success: true,
            message: "Task Added Successfully",
        });
    } catch (error) {
        next(error);
    }
}

export const getMyTask = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const task = await Task.find({ user: userId });
        res.status(200).json({
            success: true,
            task,
        });
    } catch (error) {
        next(error)
    }
}
export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return next(new ErrorHandler("Invalid ID!!", 404))//if you dont pass message to error then it will empty so use or condition in error middleware
        }
        task.isCompleted = !task.isCompleted;
        await task.save();
        res.status(200).json({
            success: true,
            message: "Task Updated Successfully!",
        });
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return next(new ErrorHandler("Invalid ID!!", 404))
        }
        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: "Task Deleted Successfully!",
        });
    } catch (error) {
        next(error);
    }
}