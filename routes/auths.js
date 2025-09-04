/** @format */

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { route } = require("./campgrounds");

router.get("/register", (req, res) => {
     res.render("auth/register");
});

router.post(
     "/register",
     catchAsync(async (req, res) => {
          const { email, username, password, confirmPassword } = req.body;

          try {
               // Create and register user
               const user = new User({ email, username });
               const registeredUser = await User.register(user, password);

               if (!registeredUser) {
                    req.flash("error", "User could not be registered");
                    return res.redirect("/register");
               }

               req.flash("success", "Welcome to YelpCamp!");
               res.redirect("/campgrounds");
          } catch (err) {
               req.flash("error", err.message);
               res.redirect("/register");
          }
     })
);

router.get("/login", (req, res) => {
     res.render("auth/login");
});
router.post(
     "/login",
     passport.authenticate("local", {
          successRedirect: "/campgrounds",
          failureRedirect: "/login",
          failureFlash: true,
     }),
     (req, res) => {
          req.flash("success", "Welcome Back!");
     }
);

module.exports = router;
