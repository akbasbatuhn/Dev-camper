const express = require("express");
const {
    registerUser,
    login,
    getMe,
    forgotPassword,
} = require("../controllers/auth");

const router = express.Router();

const { protectRoutes } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/me", protectRoutes, getMe);
router.post("/forgotpassword", forgotPassword);

module.exports = router;
