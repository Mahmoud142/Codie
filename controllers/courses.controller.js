const Course = require('../models/course.model');
const mongoose = require('mongoose');

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({}, { "__v": false });
        if (courses.length === 0) {
            res.status(200).json({ status: "success", data: { courses: [] }, message: "No courses found" });
        }
        res.status(200).json({ status: "success", data: { courses } });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

const getCourseById = async (req, res) => {
    const courseId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ status: "error", message: "Invalid course ID" });
    }
    try {
        const course = await Course.findById(courseId, { "__v": false });
        if (!course) {
            return res.status(404).json({ status: "error", message: "Course not found" });
        }
        res.status(200).json({ status: "success", data: { course } });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

const createCourse = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        // Validate required fields
        if (!title || !description || !price) {
            return res.status(400).json({
                status: "error",
                message: "Title, description, and price are required fields"
            });
        }
        // Validate price is a number
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({
                status: "error",
                message: "Price must be a positive number"
            });
        }
        // I skipped the validation for image right i can i add it in the future MA:)
        const course = await Course.create(req.body);
        res.status(201).json({ status: "success", data: { course } });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ status: "error", message: error.message });
        }
        res.status(500).json({ status: "error", message: error.message });
    }
}

const updateCourse = async (req, res) => {
    // ID validation
    const courseId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ status: "error", message: "Invalid course ID" });
    }
    try {
        const updatedCourse = await Course.updateOne({ _id: courseId }, { $set: req.body });
        res.status(200).json({ status: "success", data: { course: updatedCourse } });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

const deleteCourse = async (req, res) => {
    // ID validation
    const courseId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ status: "error", message: "Invalid course ID" });
    }
    try {
        const course = await Course.findByIdAndDelete(courseId);
        if (!course) {
            return res.status(404).json({ status: "error", message: "Course not found" });
        }
        res.status(200).json({ status: "success", message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
}








