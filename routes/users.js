const express = require("express");
const {
    createUser,
    updateUser,
    deleteUser,
    getSingleUser,
    getUsers,
} = require("../controllers/user");

const User = require("../models/User");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protectRoutes, authorizeUser } = require("../middleware/auth");

// All routes will use protectRoutes below that "use" line
router.use(protectRoutes);
router.use(authorizeUser("admin"));

router.route("/").get(advancedResults(User), getUsers).post(createUser);

router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
