const express = require("express");
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");

// Include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

const { protectRoutes } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router
    .route("/")
    .get(advancedResults(Bootcamp, "courses"), getBootcamps)
    .post(protectRoutes, createBootcamp);

router.route("/:id/photo").put(protectRoutes, bootcampPhotoUpload);

router
    .route("/:id")
    .get(getBootcamp)
    .put(protectRoutes, updateBootcamp)
    .delete(protectRoutes, deleteBootcamp);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

module.exports = router;
