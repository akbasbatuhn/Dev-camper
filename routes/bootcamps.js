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

const { protectRoutes, authorizeUser } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router
    .route("/")
    .get(advancedResults(Bootcamp, "courses"), getBootcamps)
    .post(protectRoutes, authorizeUser("publisher", "admin"), createBootcamp);

router
    .route("/:id/photo")
    .put(
        protectRoutes,
        authorizeUser("publisher", "admin"),
        bootcampPhotoUpload
    );

router
    .route("/:id")
    .get(getBootcamp)
    .put(protectRoutes, authorizeUser("publisher", "admin"), updateBootcamp)
    .delete(protectRoutes, authorizeUser("publisher", "admin"), deleteBootcamp);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

module.exports = router;
