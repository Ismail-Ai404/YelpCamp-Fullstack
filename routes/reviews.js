/** @format */

const express = require("express");
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require("../middleware/joiSchemas");

const Review = require("../models/review");
const Campground = require("../models/campground");

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

const { isLoggedIn } = require("../middleware/login");

// Validation middleware
function validateReview(req, res, next) {
     const { error } = reviewSchema.validate(req.body);
     if (error) {
          const msg = error.details.map((d) => d.message).join(", ");
          // req.flash("error", msg);
          throw new ExpressError(msg, 400);
     } else next();
}

// Create review
router.post(
     "",
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
router.delete(
     "/:reviewId",
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

module.exports = router;
