/** @format */

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const { campgroundSchema, reviewSchema } = require("./schemas");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");
const Review = require("./models/review");
const campgroundRoutes = require("./routes/campgrounds");

const app = express();

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
     console.log("Database connected");
});

// View engine setup
app.engine("ejs", ejsMate); // layouts support
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(methodOverride("_method"));

// Validation middleware

function validateReview(req, res, next) {
     const { error } = reviewSchema.validate(req.body);
     if (error) {
          const msg = error.details.map((d) => d.message).join(", ");
          // req.flash("error", msg);
          throw new ExpressError(msg, 400);
     } else next();
}

app.use(
     session({
          secret: "thisshouldbeabettersecret!",
          resave: false,
          saveUninitialized: true,
     })
);
app.use(flash());

// Flash middleware for all views
app.use((req, res, next) => {
     res.locals.success = req.flash("success");
     res.locals.error = req.flash("error");
     next();
});

// Root route
app.get("/", (req, res) => {
     res.send("Welcome to YelpCamp!");
});

app.use("/campgrounds", campgroundRoutes);

// Create review
app.post(
     "/campgrounds/:id/reviews",
     validateReview,
     catchAsync(async (req, res) => {
          const { id } = req.params;
          const campground = await Campground.findById(id);
          if (!campground) {
               req.flash("error", "Campground not Found");
               return res.redirect("/campgrounds");
          }
          const review = new Review(req.body.review);
          campground.reviews.push(review);
          await review.save();
          await campground.save();
          req.flash("success", "Review has been added");
          res.redirect(`/campgrounds/${campground._id}`);
     })
);

// Delete Review
app.delete(
     "/campgrounds/:id/reviews/:reviewId",
     catchAsync(async (req, res) => {
          const { id, reviewId } = req.params;
          const campground = await Campground.findByIdAndUpdate(id, {
               $pull: { reviews: reviewId },
          });
          if (!campground) {
               req.flash("error", "Campground not found.");
               return res.redirect("/campgrounds");
          }
          await Review.findByIdAndDelete(reviewId);
          req.flash("success", "Review deleted successfully!");
          res.redirect(`/campgrounds/${campground._id}`);
     })
);

// Catch-all handler (404)
app.all(/.*/, (req, res, next) => {
     next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
     console.log(err);
     const { statusCode = 500 } = err;
     if (!err.message) err.message = "Something went wrong! ";
     res.status(statusCode).render("error", { err });
});

// Server start
app.listen(3000, () => {
     console.log("Serving on port 3000");
});
