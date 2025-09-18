/** @format */
const Campground = require("../models/campground");
const Review = require("../models/review");
const catchAsync = require("../utils/catchAsync");

module.exports.getReviews = catchAsync(async (req, res) => {
     const { id } = req.params;
     
     const campground = await Campground.findById(id).populate({
          path: 'reviews',
          populate: {
               path: 'author',
               select: 'username'
          }
     });
     
     if (!campground) {
          return res.status(404).json({
               success: false,
               message: "Campground not found"
          });
     }
     
     res.json({
          success: true,
          reviews: campground.reviews || []
     });
});

module.exports.createReview = catchAsync(async (req, res) => {
     const { id } = req.params;
     const { body, rating } = req.body;
     
     const campground = await Campground.findById(id);
     if (!campground) {
          return res.status(404).json({
               success: false,
               message: "Campground not found"
          });
     }
     
     const review = new Review({
          body,
          rating,
          author: req.user._id
     });
     
     campground.reviews.push(review);
     await review.save();
     await campground.save();
     
     // Populate the review with author info for response
     await review.populate('author', 'username');
     
     res.status(201).json({
          success: true,
          message: "Review has been added",
          review
     });
});
module.exports.deleteReview = catchAsync(async (req, res) => {
     const { id, reviewId } = req.params;
     
     const campground = await Campground.findByIdAndUpdate(id, {
          $pull: { reviews: reviewId },
     });
     
     if (!campground) {
          return res.status(404).json({
               success: false,
               message: "Campground not found"
          });
     }
     
     await Review.findByIdAndDelete(reviewId);
     
     res.json({
          success: true,
          message: "Review deleted successfully!"
     });
});
