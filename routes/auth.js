const express = require("express");
const { registerUser, login, getMe } = require("../controllers/auth");

const router = express.Router();

const { protectRoutes } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/me", protectRoutes, getMe);

module.exports = router;
