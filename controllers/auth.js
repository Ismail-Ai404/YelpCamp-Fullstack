/** @format */

const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

module.exports.renderRegisterForm = (req, res) => {
     res.render("auth/register");
};

module.exports.registerUser = catchAsync(async (req, res, next) => {
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
});

module.exports.renderLoginForm = (req, res) => {
     res.render("auth/login");
};

module.exports.loginUser = (req, res) => {
     req.flash("success", "Welcome Back!");
     const redirectUrl = res.locals.returnTo || "/campgrounds"; // update this line to use res.locals.returnTo now
     delete req.session.returnTo; // Clears the session value after use (prevents staleness)

     // console.log(redirectUrl);
     // console.log(res.locals.returnTo);
     // delete req.locals.returnTo; // clean up session

     res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
     req.logout((err) => {
          if (err) {
               return next(err);
          }
          req.flash("success", "Goodbye!");
          res.redirect("/campgrounds");
     });
};
