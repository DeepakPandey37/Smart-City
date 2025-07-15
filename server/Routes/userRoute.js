// userRoute.js
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  updateProfile,
} = require("../Controllers/userController");

const isAuthenticated = require("../Middlewares/isAuthenticated");
const singleUpload = require("../Middlewares/multer");
const multiUpload = require("../Middlewares/multi");

// ✅ FIXED: singleUpload comes before register
router.route("/register").post(singleUpload, register); 
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post( multiUpload, isAuthenticated, updateProfile);

module.exports = router;
