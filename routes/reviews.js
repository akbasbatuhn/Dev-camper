const express = require("express");
const {
    getReviews,
    getReview,
    addReview,
    updateReview,
    deleteReview,
} = require("../controllers/reviews");

const Review = require("../models/Review");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

const { protectRoutes, authorizeUser } = require("../middleware/auth");

router
    .route("/")
    .get(
        advancedResults(Review, {
            path: "bootcamp",
            select: "name description",
        }),
        getReviews
    )
    .post(protectRoutes, authorizeUser("user", "admin"), addReview);

router
    .route("/:id")
    .get(getReview)
    .put(protectRoutes, authorizeUser("user", "admin"), updateReview)
    .delete(protectRoutes, authorizeUser("user", "admin"), deleteReview);

module.exports = router;
