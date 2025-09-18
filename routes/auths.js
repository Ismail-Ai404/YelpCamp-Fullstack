/** @format */

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { route } = require("./campgrounds");
const ctlAuths = require("../controllers/auth");
const { validateUser } = require("../middlewares/schemaValidation");

// const { isLoggedIn } = require("../middleware/login");
const { storeReturnTo } = require("../middlewares/sessionStore.js");

router.post("/register", validateUser, ctlAuths.registerUser);

router.post(
     "/login",
     passport.authenticate("local", {
          failureMessage: true
     }),
     ctlAuths.loginUser
);

router.post("/logout", ctlAuths.logoutUser);

// Get current user
router.get("/me", ctlAuths.getCurrentUser);

module.exports = router;
