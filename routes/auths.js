/** @format */

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { route } = require("./campgrounds");
const ctlAuths = require("../controllers/auth");

// const { isLoggedIn } = require("../middleware/login");
const { storeReturnTo } = require("../middlewares/sessionStore.js");

router
     .route("/register")
     .get(ctlAuths.renderRegisterForm)
     .post(ctlAuths.registerUser);

router
     .route("/login")
     .get(ctlAuths.renderLoginForm)
     .post(
          storeReturnTo,
          passport.authenticate("local", {
               // successRedirect: "/campgrounds",
               failureRedirect: "/login",
               failureFlash: true,
          }),
          ctlAuths.loginUser
     );

router.get("/logout", ctlAuths.logoutUser);

module.exports = router;
