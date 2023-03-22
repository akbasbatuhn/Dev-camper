const express = require("express");
const {
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse,
} = require("../controllers/courses");

const Course = require("../models/Course");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

const { protectRoutes } = require("../middleware/auth");

router
    .route("/")
    .get(
        advancedResults(Course, {
            path: "bootcamp",
            select: "name description",
        }),
        getCourses
    )
    .post(protectRoutes, addCourse);
router
    .route("/:id")
    .get(getCourse)
    .put(protectRoutes, updateCourse)
    .delete(protectRoutes, deleteCourse);

module.exports = router;
