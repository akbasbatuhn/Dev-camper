const express = require("express");
const {
    registerUser,
    login,
    getMe,
    forgotPassword,
    resetPassword,
    updateDetails,
    updatePassword,
    logout,
} = require("../controllers/auth");

const router = express.Router();

const { protectRoutes } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protectRoutes, getMe);
router.put("/updatedetails", protectRoutes, updateDetails);
router.put("/updatepassword", protectRoutes, updatePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router;
