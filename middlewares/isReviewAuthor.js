/** @format */

const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports = isReviewAuthor = async (req, res, next) => {
     try {
          const { id, reviewId } = req.params;
          const review = await Review.findById(reviewId);

          // Check if review exists
          if (!review) {
               req.flash("error", "Review not found!");
               return res.redirect(`/campgrounds/${id}`);
          }

          // Check if review has an author
          if (!review.author) {
               req.flash("error", "Review has no author!");
               return res.redirect(`/campgrounds/${id}`);
          }

          // Handle both populated and non-populated author cases
          let authorId;
          if (review.author._id) {
               // Author is populated (User document)
               authorId = review.author._id;
          } else {
               // Author is not populated (ObjectId)
               authorId = review.author;
          }

          // Compare author ID with current user's ID
          if (!authorId.equals(req.user._id)) {
               req.flash("error", "You do not have permission to do that!");
               return res.redirect(`/campgrounds/${id}`);
          }

          next();
     } catch (err) {
          console.error(err);
          req.flash("error", "Something went wrong!");
          res.redirect(`/campgrounds/${req.params.id}`);
     }
};
