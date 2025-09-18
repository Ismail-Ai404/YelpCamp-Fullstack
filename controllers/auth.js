/** @format */

const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

module.exports.registerUser = catchAsync(async (req, res, next) => {
     const { email, username, password, confirmPassword } = req.body;

     try {
          // Create and register user
          const user = new User({ email, username });
          const registeredUser = await User.register(user, password);
          req.login(registeredUser, (err) => {
               if (err) return next(err);
               res.json({
                    success: true,
                    message: "Welcome to YelpCamp!",
                    user: {
                         id: registeredUser._id,
                         username: registeredUser.username,
                         email: registeredUser.email
                    }
               });
          });

          if (!registeredUser) {
               return res.status(400).json({
                    success: false,
                    message: "User could not be registered"
               });
          }
     } catch (err) {
          res.status(400).json({
               success: false,
               message: err.message
          });
     }
});

module.exports.loginUser = (req, res) => {
     delete req.session.returnTo; // Clears the session value after use (prevents staleness)
     
     res.json({
          success: true,
          message: "Welcome Back!",
          user: {
               id: req.user._id,
               username: req.user.username,
               email: req.user.email
          }
     });
};

module.exports.logoutUser = (req, res, next) => {
     req.logout((err) => {
          if (err) {
               return next(err);
          }
          res.json({
               success: true,
               message: "Goodbye!"
          });
     });
};

// Get current user endpoint
module.exports.getCurrentUser = (req, res) => {
     if (req.user) {
          res.json({
               success: true,
               user: {
                    id: req.user._id,
                    username: req.user.username,
                    email: req.user.email
               }
          });
     } else {
          res.status(401).json({
               success: false,
               message: "Not authenticated"
          });
     }
};
