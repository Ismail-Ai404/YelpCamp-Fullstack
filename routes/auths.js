/** @format */

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { route } = require("./campgrounds");

// const { isLoggedIn } = require("../middleware/login");
const { storeReturnTo } = require("../middlewares/sessionStore");

router.get("/register", (req, res) => {
     res.render("auth/register");
});

router.post(
     "/register",
     catchAsync(async (req, res, next) => {
          const { email, username, password, confirmPassword } = req.body;

          try {
               // Create and register user
               const user = new User({ email, username });
               const registeredUser = await User.register(user, password);
               req.login(registeredUser, (err) => {
                    if (err) return next(err);
                    req.flash("success", "Welcome to YelpCamp!");
                    res.redirect("/campgrounds");
               });

               if (!registeredUser) {
                    req.flash("error", "User could not be registered");
                    return res.redirect("/register");
               }
          } catch (err) {
               req.flash("error", err.message);
               res.redirect("/register");
          }
     })
);

router.get(
     "/login",

     (req, res) => {
          res.render("auth/login");
     }
);
router.post(
     "/login",
     storeReturnTo,
     passport.authenticate("local", {
          // successRedirect: "/campgrounds",
          failureRedirect: "/login",
          failureFlash: true,
     }),
     (req, res) => {
          req.flash("success", "Welcome Back!");
          const redirectUrl = res.locals.returnTo || "/campgrounds"; // update this line to use res.locals.returnTo now
          delete req.session.returnTo; // Clears the session value after use (prevents staleness)

          // console.log(redirectUrl);

          // console.log(res.locals.returnTo);
          // delete req.locals.returnTo; // clean up session
          res.redirect(redirectUrl);
     }
);

router.get("/logout", (req, res, next) => {
     req.logout((err) => {
          if (err) {
               return next(err);
          }
          req.flash("success", "Goodbye!");
          res.redirect("/campgrounds");
     });
});

module.exports = router;
