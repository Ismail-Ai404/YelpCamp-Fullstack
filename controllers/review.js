/** @format */
const Campground = require("../models/campground");
const Review = require("../models/review");
const catchAsync = require("../utils/catchAsync");

module.exports.createReview = catchAsync(async (req, res) => {
     const { id } = req.params;
     const campground = await Campground.findById(id).populate("author");
     if (!campground) {
          req.flash("error", "Campground not Found");
          return res.redirect("/campgrounds");
     }
     const review = new Review(req.body.review);
     review.author = req.user._id;
     campground.reviews.push(review);
     await review.save();
     await campground.save();
     req.flash("success", "Review has been added");
     res.redirect(`/campgrounds/${campground._id}`);
});
module.exports.deleteReview = catchAsync(async (req, res) => {
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
});
