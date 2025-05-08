const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courses.controller');

// Get all courses
router.get('/', courseController.getAllCourses);

// Create new course
router.post('/', courseController.createCourse);

// Course routes with ID parameter
router.route('/:id')
    .get(courseController.getCourseById)
    .put(courseController.updateCourse)
    .delete(courseController.deleteCourse);

module.exports = router;
